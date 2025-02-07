import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  Tab,
  Tabs,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  EmojiEvents as TrophyIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import LeaderboardRow from '../components/leaderboard/LeaderboardRow';
import {
  fetchGlobalLeaderboard,
  fetchSubjectLeaderboard,
  fetchUserRank,
} from '../store/slices/leaderboardSlice';

const subjects = ['Mathematics', 'Science', 'History', 'Geography', 'Literature'];

const Leaderboard = () => {
  const dispatch = useDispatch();
  const {
    globalLeaderboard,
    subjectLeaderboard,
    userRank,
    isLoading,
  } = useSelector((state) => state.leaderboard);
  const { user } = useSelector((state) => state.auth);

  const [currentTab, setCurrentTab] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(fetchGlobalLeaderboard());
    dispatch(fetchUserRank());
  }, [dispatch]);

  useEffect(() => {
    if (currentTab === 1) {
      dispatch(fetchSubjectLeaderboard(selectedSubject));
    }
  }, [dispatch, currentTab, selectedSubject]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setFilterAnchorEl(null);
  };

  const currentLeaderboard = currentTab === 0 ? globalLeaderboard : subjectLeaderboard;
  const topThree = currentLeaderboard.slice(0, 3);
  const restOfLeaderboard = currentLeaderboard.slice(3);

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
            Leaderboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Compete with others and climb the ranks
          </Typography>
        </Box>

        {/* Top 3 Podium */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {topThree.map((user, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={user.id}
              sx={{
                order: {
                  xs: index,
                  md: index === 1 ? 0 : index === 0 ? 1 : 2,
                },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transform: index === 1 ? 'scale(1.05)' : 'none',
                    bgcolor: index === 0 ? 'warning.light' :
                            index === 1 ? 'primary.light' :
                            'secondary.light',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        color: index === 0 ? 'warning.dark' :
                                index === 1 ? 'primary.dark' :
                                'secondary.dark',
                      }}
                    >
                      #{index + 1}
                    </Typography>
                    <Avatar
                      src={user.avatar}
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        border: 3,
                        borderColor: index === 0 ? '#FFD700' :
                                    index === 1 ? '#C0C0C0' :
                                    '#CD7F32',
                      }}
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {user.name}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      {user.points} points
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Tabs and Filter */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{ flexGrow: 1 }}
          >
            <Tab
              icon={<TrophyIcon />}
              label="Global"
              iconPosition="start"
            />
            <Tab
              icon={<TimelineIcon />}
              label="By Subject"
              iconPosition="start"
            />
          </Tabs>

          {currentTab === 1 && (
            <>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={(e) => setFilterAnchorEl(e.currentTarget)}
              >
                {selectedSubject}
              </Button>
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={() => setFilterAnchorEl(null)}
              >
                {subjects.map((subject) => (
                  <MenuItem
                    key={subject}
                    onClick={() => handleSubjectSelect(subject)}
                    selected={subject === selectedSubject}
                  >
                    {subject}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Box>

        {/* Leaderboard List */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <List>
            {restOfLeaderboard.map((userData, index) => (
              <LeaderboardRow
                key={userData.id}
                user={userData}
                rank={index + 4}
                isCurrentUser={userData.id === user?.id}
              />
            ))}
          </List>

          {/* User's Current Rank */}
          {userRank && (
            <Box
              sx={{
                mt: 3,
                pt: 3,
                borderTop: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                Your Current Position
              </Typography>
              <LeaderboardRow
                user={user}
                rank={userRank.rank}
                isCurrentUser={true}
              />
            </Box>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Leaderboard;
