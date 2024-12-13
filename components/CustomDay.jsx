import { Box, Typography } from "@mui/material";

const CustomDay = ({ day, isEventDay, theme, onClick, ...rest }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(day);
    }
  };

  return (
    <Box
      component="div"
      onClick={handleClick}
      sx={{
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        bgcolor: isEventDay ? theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.secondary.light : 'transparent',
        
        cursor: isEventDay ? 'pointer' : 'default',
        ...rest.sx,
      }}
    >
      <Typography variant="body1" >
        {day.day}
      </Typography>
    </Box>
  );
};

export default CustomDay;
