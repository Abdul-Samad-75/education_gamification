import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BadgeCard from '../components/badge/BadgeCard';
import { fetchBadges, fetchUserBadges } from '../store/slices/badgeSlice';

const Badges = () => {
  const dispatch = useDispatch();
  const { badges, userBadges, isLoading } = useSelector((state) => state.badge);
  
  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchBadges());
    dispatch(fetchUserBadges());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const filteredBadges = badges.filter((badge) =>
    badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    badge.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const earnedBadges = filteredBadges.filter((badge) =>
    userBadges.some((userBadge) => userBadge.id === badge.id)
  );

  const unearnedBadges = filteredBadges.filter((badge) =>
    !userBadges.some((userBadge) => userBadge.id === badge.id)
  );

  const displayBadges = currentTab === 0 ? filteredBadges : 
                       currentTab === 1 ? earnedBadges : 
                       unearnedBadges;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
            Achievement Badges
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Collect badges by completing challenges and reaching milestones
          </Typography>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="All Badges" />
                <Tab label="Earned" />
                <Tab label="Unearned" />
              </Tabs>
            </Grid>
          </Grid>
        </Box>

        {/* Badge Grid */}
        <Grid container spacing={3}>
          {displayBadges.map((badge, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={badge.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BadgeCard
                  badge={badge}
                  isEarned={userBadges.some((userBadge) => userBadge.id === badge.id)}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {displayBadges.length === 0 && !isLoading && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              {searchTerm
                ? 'No badges found matching your search'
                : currentTab === 1
                ? "You haven't earned any badges yet"
                : 'No badges available'}
            </Typography>
          </Box>
        )}

        {/* Stats Summary */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 1,
          }}
        >
          <Grid container spacing={3} textAlign="center">
            <Grid item xs={4}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                {earnedBadges.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Badges Earned
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                {unearnedBadges.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Badges Available
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                {Math.round((earnedBadges.length / badges.length) * 100)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completion Rate
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Badges;
