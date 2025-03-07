import { Button, CircularProgress } from '@mui/material';

const LoadingButton = ({ loading = false, children, ...props }) => {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      sx={{
        position: 'relative',
        ...props.sx,
      }}
    >
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
      <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {children}
      </span>
    </Button>
  );
};

export default LoadingButton;
