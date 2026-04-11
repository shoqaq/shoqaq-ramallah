```javascript
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  body {
    background-color: #f8f9fa;
    color: #333;
    line-height: 1.6;
    direction: rtl; /* Support for Arabic interface */
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const theme = {
  primary: '#2c3e50',
  secondary: '#27ae60',
  accent: '#e74c3c',
  light: '#ffffff',
  gray: '#95a5a6',
  shadow: '0 4px 6px rgba(0,0,0,0.1)',
  borderRadius: '12px'
};

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
`;

export const Logo = styled.h1`
  font-size: 1.8rem;
  color: ${theme.primary};
  font-weight: 800;
  cursor: pointer;
  
  span {
    color: ${theme.secondary};
  }
`;

export const HeroSection = styled.div`
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${theme.borderRadius};
  color: white;
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
`;

export const SearchBar = styled.div`
  background: white;
  padding: 10px;
  border-radius: 50px;
  display: flex;
  width: 90%;
  max-width: 700px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  margin-top: 20px;

  input {
    flex: 1;
    border: none;
    padding: 15px 25px;
    font-size: 1rem;
    outline: none;
    border-radius: 50px;
  }

  button {
    background: ${theme.secondary};
    color: white;
    border: none;
    padding: 10px 30px;
    border-radius: 50px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
      background: #219150;
    }
  }
`;

export const SectionTitle = styled.div`
  margin-bottom: 30px;
  
  h2 {
    font-size: 2rem;
    color: ${theme.primary};
    margin-bottom: 8px;
  }

  p {
    color: ${theme.gray};
    font-size: 1.1rem;
  }
`;

export const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
`;

export const PropertyCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius};
  overflow: hidden;
  box-shadow: ${theme.shadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  .image-container {
    height: 200px;
    background: #ddd;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .price-tag {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: ${theme.secondary};
      color: white;
      padding: 5px 15px;
      border-radius: 5px;
      font-weight: bold;
    }
  }

  .content {
    padding: 20px;

    h3 {
      margin-bottom: 10px;
      color: ${theme.primary};
    }

    .location {
      color: ${theme.gray};
      font-size: 0.9rem;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .details {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #eee;
      padding-top: 15px;
      color: #555;
      font-size: 0.9rem;
    }
  }
`;

export const AdminToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: ${theme.primary};
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;
```
