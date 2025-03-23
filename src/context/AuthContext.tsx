import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import userProfilesData from '../data/user_profiles.json';

// Default placeholder avatar URL
export const DEFAULT_AVATAR = '/default-avatar.png';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  bio: string;
  avatarUrl: string;
  following: number;
  followers: number;
  videosWatched: number;
  preferences: {
    darkMode: boolean;
    autoplay: boolean;
    notifications: boolean;
  };
  badges: Array<{
    id: string;
    name: string;
    description: string;
    iconUrl: string;
  }>;
  savedVideos: string[];
}

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: { username: string; password: string; email: string; name: string }) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  updateProfile: (userData: Partial<UserProfile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('tiktok_user');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setCurrentUser(userData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        localStorage.removeItem('tiktok_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Find user in our mock data
      const user = userProfilesData.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
      );

      if (!user) {
        setError('Invalid username or password');
        return false;
      }

      // Create a user object without the password
      const { password: _, ...safeUserData } = user;
      
      // Store in localStorage (in a real app, we'd use a token)
      localStorage.setItem('tiktok_user', JSON.stringify(safeUserData));
      
      setCurrentUser(safeUserData as UserProfile);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { 
    username: string; 
    password: string; 
    email: string; 
    name: string 
  }): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check if username already exists
      const existingUser = userProfilesData.find(
        u => u.username.toLowerCase() === userData.username.toLowerCase()
      );

      if (existingUser) {
        setError('Username already exists');
        return false;
      }

      // In a real app, we would send this data to an API to create a new user
      // For our mock implementation, we'll just pretend it succeeded
      
      // Create a mock user profile
      const newUser: UserProfile = {
        id: (userProfilesData.length + 1).toString(),
        username: userData.username,
        email: userData.email,
        name: userData.name,
        bio: "",
        avatarUrl: DEFAULT_AVATAR,
        following: 0,
        followers: 0,
        videosWatched: 0,
        preferences: {
          darkMode: false,
          autoplay: true,
          notifications: true
        },
        badges: [],
        savedVideos: []
      };

      // Store in localStorage
      localStorage.setItem('tiktok_user', JSON.stringify(newUser));
      
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred during registration');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<UserProfile>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!currentUser) {
        setError('Not authenticated');
        return false;
      }

      // Update the current user data
      const updatedUser = {
        ...currentUser,
        ...userData
      };
      
      // Store in localStorage
      localStorage.setItem('tiktok_user', JSON.stringify(updatedUser));
      
      setCurrentUser(updatedUser);
      return true;
    } catch (err) {
      console.error('Profile update error:', err);
      setError('An error occurred while updating your profile');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('tiktok_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 