import { Box, ChakraProvider, Container, Divider, Heading, Image, Text, VStack } from '@chakra-ui/react';
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={ 4 }>
        <Container 
          borderRadius='sm'
          backgroundColor='white'
          boxShadow="md"
          // marginY={ 4 }
          maxWidth='container.xl'
          padding={ 4 }
        >
          <VStack marginBottom={ 6 }>
            <Image 
              borderRadius={9999} 
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
              boxSize='100px'
            />
            <Heading>Almacen</Heading>
            <Text>El almacen de Iván</Text>
          </VStack>
          <Divider marginY={ 7 } />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
