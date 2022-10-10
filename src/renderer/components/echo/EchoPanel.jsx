
import { useState } from "react"


import pb from "../../pb_js/echo/v1/echo_pb.js"
import client from "../../pb_js/echo/v1/echo_grpc_web_pb.js"
import { TextField, Box, Button, Typography } from "@mui/material"

import { useSelector, useDispatch } from 'react-redux'

function EchoPanel() {

  const grpcServer = useSelector((state) => state.grpcSettings.grpcServer);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("")
  const [reply, setReply] = useState(null)


  const newEchoService = (grpcServer) => {
    return new client.EchoServiceClient(grpcServer);
  }

  const grpc_request = () => {

    console.log("[DEBUG]: gRPC server : " , grpcServer)
    const echoService = newEchoService(grpcServer)

    const request = new pb.EchoRequest();

    if (message.trim() != "") {

      request.setMessage(message);

      echoService.echo(request, {}, function (err, response) {
        // ...
        console.log("[DEBUG]: response: " , response)
        if (err === null) {
          setReply(response.array ? response.array[0] : response.j[0] )
        } else {
          setReply(err.message)
        }
      })
    }
  }
  return (
    <Box sx={{}}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"

      }}>
        <Box sx={{ padding: 6 }}>
          <Typography variant="body2">
            Echo gRPC is simplest gRPC request and response demostration.
          </Typography>
        </Box>
        <Box>

          <TextField
            sx={{

            }}
            size="small"
            variant="outlined"
            label="message"
            onChange={(event) => setMessage(event.target.value)}
            value={message} />
          <Button sx={{
            marginLeft: 3
          }}
            variant="contained"
            size="small"
            onClick={grpc_request}>
            Send
          </Button>
        </Box>
      </Box>
      <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {reply &&
          <Box sx={{
            opacity: 0.7
          }}>
            {reply}
          </Box>
        }
      </Box>
    </Box>
  )
}

export default EchoPanel
