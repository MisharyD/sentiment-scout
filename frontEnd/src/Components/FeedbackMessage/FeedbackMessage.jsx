import * as React from 'react';
import Alert from '@mui/joy/Alert';
import AspectRatio from '@mui/joy/AspectRatio';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import LinearProgress from '@mui/joy/LinearProgress';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Warning from '@mui/icons-material/Warning';

export default function FeedbackMessage(props) {
  if (!props.visibility) return null;
  return (
    props.type === 'success' ? (
      <Alert
        size="lg"
        color="success"
        variant="solid"
        invertedColors
        startDecorator={
          <AspectRatio
            variant="solid"
            ratio="1"
            sx={{
              minWidth: 40,
              borderRadius: '50%',
              boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
            }}
          >
            <div>
              <Check fontSize="xl2" />
            </div>
          </AspectRatio>
        }
        endDecorator={
          <IconButton
            variant="plain"
            sx={{
              '--IconButton-size': '32px',
              transform: 'translate(0.5rem, -0.5rem)',
            }}
          >
            <Close />
          </IconButton>
        }
        sx={{ alignItems: 'flex-start', overflow: 'hidden' }}
      >
        <div>
          <Typography level="title-lg">Welcome Aboard!</Typography>
          <Typography level="body-sm">
          Your OTP has been verified successfully. Let’s get started on this exciting journey together!
          </Typography>
        </div>
        <LinearProgress
          variant="solid"
          color="success"
          value={40}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
          }}
        />
      </Alert>):(
      <Alert
        variant="soft"
        color="danger"
        invertedColors
        startDecorator={
          <CircularProgress size="lg" color="danger">
            <Warning />
          </CircularProgress>
        }
        sx={{ alignItems: 'flex-start', gap: '1rem' }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography level="title-md">OTP Verification Failed!</Typography>
          <Typography level="body-md">
           {props.text}
          </Typography>
          {/* <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" size="sm">
              Open network settings
            </Button>
            <Button variant="solid" size="sm">
              Try again
            </Button>
          </Box> */}
        </Box>
      </Alert>)
   
  );
}
