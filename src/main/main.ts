/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import fs from 'fs';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

import debug from 'electron-debug';
import { error } from 'console';


interface PROGRESS {
  frames: number;
  currentFps: number;
  currentKbps: number;
  targetSize: number;
  timemark: string;
  percent: number;
}

const FfmpegCommand = require('fluent-ffmpeg');


const ipcChannels = {
  progressPercent: 'progressPercent',
  ipcExample: 'ipc-example',
  mergeVideoWatermark: 'merge-video-watermark',
};

const mergeVideo = async (event, args) => {
  // extract the ffmpeg parameters
  const ffmpegCommand = new FfmpegCommand();

  const [video, image, subtitle, output] = args;

  // set environment
  let ffmpegPath;
  let ffprobePath;
  if (process.env.NODE_ENV === 'development') {
    ffmpegPath = 'ffmpeg\\bin\\ffmpeg.exe';
    ffprobePath = 'ffmpeg\\bin\\ffprobe.exe';
  } else {
    /**
     * build environment path, DO NOT add __dirname, because source file will packaged into 7z asar file.
     */
    ffmpegPath = path.join('resources', 'ffmpeg' ,'bin', 'ffmpeg.exe');
    ffprobePath = path.join( 'resources', 'ffmpeg' ,'bin', 'ffprobe.exe');
  }

  
  if(fs.existsSync(ffmpegPath)) {
    ffmpegCommand
      .setFfmpegPath(ffmpegPath)
    .setFfprobePath(ffprobePath)
  }else{
    console.log(`[DEBUG]: CANNOT found ${ffmpegPath}  `)
    console.log(`[DEBUG]: __dirname ${__dirname}  `)
    throw error(`CANNOT found ${ffmpegPath}`)
  }

  // prepare merge video and watermark, and add event listeners
  const command = ffmpegCommand
    .addInput(video)
    .addInput(image)
    .noAudio()
    .on('progress', function (progress: PROGRESS) {
      console.log(`[DEBUG]: progress ${progress.percent}`)
      if (progress.percent)
        event.reply(ipcChannels.progressPercent, {
          percent: progress.percent,
          end: false,
        });
    })
    .on('end', () =>
      event.reply(ipcChannels.progressPercent, { percent: 100, end: true })
    )
    .on(
      'error',
      function (err: { message: string }, stdout: unknown, stderr: unknown) {
        console.log(`Cannot process video: ${err.message}`);
      }
    );


  let complexFilterStr: string ;

  if (subtitle.length > 0) {
    complexFilterStr = '[0:v][1:v]overlay=x=W-w-30:y=H-h-30,subtitles=subtitles.srt';

    // Due to the filter string format we CANNOT use the full path of the subtitle file.
    // The solution is copy the subtitle to current folder which run the electron app.
    await fs.copyFile(subtitle, 'subtitles.srt', () => {
      // DOC: http://ffmpeg.org/ffmpeg-filters.html#overlay-1
      command.complexFilter(complexFilterStr).save(output);
    });
  } else {
    complexFilterStr = '[0:v][1:v]overlay=x=W-w-30:y=H-h-30';
    command.complexFilter(complexFilterStr).save(output);
  }

};


debug();

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;



if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: app.isPackaged || process.env.NODE_ENV === 'production'
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  if(process.env.NODE_ENV !== 'production'){
    mainWindow.loadURL(`http://localhost:${process.env.PORT || 1212}/`);
  }else{
    mainWindow.loadURL(resolveHtmlPath('index.html'));
  }


  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
    mainWindow.webContents.send('ping', '🤘') 
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

// ffmpeg command IPC
ipcMain.on(ipcChannels.mergeVideoWatermark, async (event, args) => {
  mergeVideo(event, args);
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
