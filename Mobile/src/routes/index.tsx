import { useContext } from 'react';
import { Box, useTheme } from 'native-base';
import { AuthContext } from '@contexts/AuthContext';
import { useAuth } from '@hooks/useAuth';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const theme = DefaultTheme;

  const { colors } = useTheme();

  const { user } = useAuth();
  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg="gray.600">
      <NavigationContainer theme={theme}>
        <AuthRoutes />

        {/* <AppRoutes /> */}
      </NavigationContainer>
    </Box>
  );
}
