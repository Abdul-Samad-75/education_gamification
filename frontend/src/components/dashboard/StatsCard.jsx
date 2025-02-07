import { Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <Paper
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          bgcolor: `${color}.light`,
          color: `${color}.dark`,
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: (theme) => theme.shadows[10],
          },
        }}
      >
        <Box
          sx={{
            p: 1,
            borderRadius: '50%',
            bgcolor: `${color}.main`,
            color: 'white',
            mb: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
          {value}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default StatsCard;
