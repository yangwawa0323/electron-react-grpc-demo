import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Button,
  Input,
  InputLabel,
  IconButton,
  FormControl,
  FormLabel,
  FormHelperText,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Snackbar,
  Modal,
  Alert as MuiAlert,
  Typography,
  styled,
} from '@mui/material';

import {
	VideoCameraBackOutlined,
  AddPhotoAlternateOutlined,
  AddOutlined,
  VideoCameraFrontOutlined,
  ArrowForwardOutlined,
  VideoFileOutlined,
  ImageOutlined,
  HelpOutlineOutlined,
} from '@mui/icons-material';

import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

import path from 'path-browserify';

import _ from 'lodash';

const ipcChannels = {
  progressPercent: 'progressPercent',
  ipcExample: 'ipc-example',
  mergeVideoWatermark: 'merge-video-watermark',
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const VideoConvertPannel = () => {
  const [video, setVideo] = useState('');
  const [image, setImage] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [output, setOutput] = useState('');
  const [showHelp, setShowHelp] = useState(true);
  const [error, setError] = useState(null);


  const [progress, setProgress] = useState({ percent: 0, end: false });

  useEffect(() => {
    // add event listener on IPC
    console.log("[DEBUG]: " , window, window.electron)
    window.electron.ipcRenderer.on(ipcChannels.progressPercent, (progress) => {
      if (progress !== undefined) {
        setProgress(progress);
      }
    });
  }, []);

  const mergeVideo = () => {
    window.electron.ipcRenderer.sendMessage(ipcChannels.mergeVideoWatermark, [
      video,
      image,
      subtitle,
      output,
    ]);
  };

  const selectFile = (e) => (type) => {
    // get the 1st file object,
    try {
      const file = path.join(e.target.files[0].path);

      if (type === 'video') {
        setVideo(file);
        let delimiter;

        // Determine the OS type
        if (navigator.appVersion.indexOf('Win') != -1) {
          delimiter = '\\';
        } else {
          // Mac Linux X11
          delimiter = '/';
        }

        const filePart = file.split(delimiter);
        const filename = _.last(filePart);
        const basename = _.join(_.dropRight(filePart), delimiter);

        // replace the filename by insert the `merged`
        const file_ = filename.split('.');
        file_.splice(-1, 0, 'merged');
        setOutput(_.join([basename, delimiter, _.join(file_, '.')], ''));
      } else if (type === 'image') {
        setImage(file);
      } else if (type === 'subtitle') {
        setSubtitle(file)
      }

    } catch (e) {
      setError(e);
    }
  };

 const handleClose = () => {
    setTimeout(() => setProgress({ percent: 0, end: false }), 3000);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Error alert */}
        <Snackbar open={!!error}  onClose={()=> setError(null)} autoHideDuration={6000}>
          <Alert severity="warning" onClose={()=> setError(null)} sx={{ width: '100%' }}>
            Browser can not convert video by ffmpeg
          </Alert>
        </Snackbar>

      <IconButton
        sx={{ m: 1, right: 0, position: 'absolute' }}
        onClick={() => setShowHelp(true)}
      >
        <HelpOutlineOutlined sx={{ fontSize: 28 }} />
      </IconButton>
      <Modal open={showHelp} onClose={() => setShowHelp(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Attention: Add watermark to video
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Intend to add the watermark to video, you have to install `ffmpeg`
            already. The nodejs module need call the system command. So this
            functionality can only run by electron in your local OS.
          </Typography>
        </Box>
      </Modal>
      <Paper sx={{ p: '2px 4px', height: '80%vh', width: '100%vw' }}>
        <Typography variant="h6" sx={{ p: 1 }}>
          Add watermark
        </Typography>
    

        <Box sx={{ m: 5, display: 'flex', flexDirection: 'column' }}>
          {/* Select Video   */}
          <FormControl>
            <InputLabel htmlFor="video-file">Video</InputLabel>
            <Input
              id="video-file"
              label="video"
              onChange={(e) => setVideo(e.target.value)}
              sx={{
                m: 3,
                flex: 3,
                width: 660,
                borderBottom: '1px solid black',
              }}
              placeholder="Select the video to add watermark"
              inputProps={{ 'aria-label': 'Input video' }}
              value={video}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    component="label"
                    type="button"
                    sx={{ mb: 2 }}
                    aria-label="select video"
                  >
                    <VideoFileOutlined sx={{ fontSize: 32 }} />
                    <input
                      type="file"
                      accept="video/*"
                      hidden
                      onInput={(e) => selectFile(e)('video')}
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* Select Image  */}
          <FormControl>
            <InputLabel htmlFor="image-file">Watermark</InputLabel>
            <Input
              id="image-file"
              label="watermark"
              onChange={(e) => setImage(e.target.value)}
              sx={{
                m: 3,
                flex: 3,
                width: 660,
                borderBottom: '1px solid black',
              }}
              placeholder="Select the watermark image"
              inputProps={{ 'aria-label': 'watermark' }}
              value={image}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    component="label"
                    type="button"
                    sx={{ mb: 2 }}
                    aria-label="select image"
                  >
                    <ImageOutlined sx={{ fontSize: 32 }} />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onInput={(e) => selectFile(e)('image')}
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

           {/* Select subtitle  */}
          <FormControl>
            <InputLabel htmlFor="subtitle-file">subtitle</InputLabel>
            <Input
              id="subtitle-file"
              label="subtitle"
              onChange={(e) => setSubtitle(e.target.value)}
              sx={{
                m: 3,
                flex: 3,
                width: 660,
                borderBottom: '1px solid black',
              }}
              placeholder="Select the subtitle"
              inputProps={{ 'aria-label': 'subtitle' }}
              value={subtitle}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    component="label"
                    type="button"
                    sx={{ mb: 2 }}
                    aria-label="select subtitle"
                  >
                    <ImageOutlined sx={{ fontSize: 32 }} />
                    <input
                      type="file"
                      accept="subtitle/*.srt,text/*.txt"
                      hidden
                      onInput={(e) => selectFile(e)('subtitle')}
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* Output file */}
          <FormControl>
            <InputLabel htmlFor="merge-file">Output merge file</InputLabel>
            <Input
              id="merge-file"
              label="Output"
              onChange={(e) => setOutput(e.target.value)}
              sx={{
                m: 3,
                flex: 3,
                width: 660,
                borderBottom: '1px solid black',
              }}
              placeholder="Select the output place"
              inputProps={{ 'aria-label': 'output' }}
              value={output}
              endAdornment={
                <InputAdornment position="end">
                  <ImageOutlined sx={{ fontSize: 32 }} />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <Box sx={{ m: 3, display: 'flex', gap: 2,  flexDirection: 'column', justifyContent: 'center' }}>
          { (progress.percent === 0 || progress.end) ? (
          <Button
            variant="contained"
            size="large"
            disabled={!video.trim().length || !image.trim().length}
				onClick={mergeVideo}
          >
            Merge
          </Button>
          ) : 
          <BorderLinearProgress
            variant="determinate"
            value={progress.percent}
          />
          }
  
        </Box>
        <Box>
          <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleClose}
          open={progress.end}
          autoHideDuration={6000}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Merged the watermark into the video successfully.
          </Alert>
        </Snackbar>
        </Box>
      </Paper>
    </Box>
  );
};

export default VideoConvertPannel;
