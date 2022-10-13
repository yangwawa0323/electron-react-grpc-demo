import React, { useEffect, useState, createRef } from 'react';
import './grpc-pannel.scss';
import {
  Box,
  Paper,
  Typography,
  colors,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Stack,
} from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

import { useSelector, useDispatch } from 'react-redux';
import {
  show,
  hide,
  setGrpcAddressPort,
} from '../../redux/grpc-settings/slice';
import EchoPanel from '../echo/EchoPanel';
import User from '../user/User';
import UserPanel from '../user/UserPanel';

const { blue, purple } = colors;

const FormDialog = (props) => {
  const open = useSelector((state) => state.grpcSettings.open);
  const grpcServer = useSelector((state) => state.grpcSettings.grpcServer);


  const [server, setServer] = useState(grpcServer)

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hide());
  };

  const setGrpcServer = () => {
    dispatch(setGrpcAddressPort(server));
    dispatch(hide());
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>gRPC server setup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To connect to gRPC server, you need to specified the remote server
            address and port. For example:
            <Typography variant="body2" color="initial">
              http://guozi.example.com:8898
            </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Server Address:Port"
            fullWidth
            variant="standard"
            value={server}
            onChange={(e) => setServer(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={setGrpcServer}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const GrpcPannel = () => {
  const grpcServer = useSelector((state) => state.grpcSettings.grpcServer);
  const dispatch = useDispatch();

  const setGrpcServer = () => {
    dispatch(show());
  };

  return (
    <Box>
      <Paper
        className="paper"
        sx={{ minHeight: '80vh', padding: 3, borderRadius: 4 }}
        elevation={3}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack direction="row" sx={{ alignItems: 'baseline' }}>
            gRPC demo ! we will connect to
            <Typography sx={{ paddingLeft: 1 }} variant="h6" color="primary">
              {grpcServer}
            </Typography>
            .
          </Stack>
          <Stack>
            <IconButton
              size="large"
              color="secondary"
              aria-label="setting"
              onClick={setGrpcServer}
            >
              <SettingsSuggestIcon fontSize="large" className="rotate-icon" />
            </IconButton>
          </Stack>
        </Box>
        <Box>
          <FormDialog />
        </Box>
        <Box>
          <EchoPanel />
        </Box>
        <Box>
          <UserPanel />
        </Box>
      </Paper>
    </Box>
  );
};

export default GrpcPannel;
