import { FC, useMemo, useState } from "react";
import { NextPage } from "next";
import { GetStaticProps } from 'next';
import { Button, Flex, Grid, Image, Link, Stack, Text } from "@chakra-ui/react";
// import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import api from "../product/api";
import { Product } from "../product/types";

interface Props {
  products: Product[];
}
const parseCurrency = ( value: number ): string => {
  return value.toLocaleString('es-BO', {
    style: 'currency',
    currency: 'BOB'
  })
}
export const HomeRoute:FC<Props> = ({ products }) => {

  const [cart, setCart] = useState<Product[]>([]);
  const text = useMemo(() => 
    cart.reduce(
          (message, product) => message.concat(`* ${product.title} - ${ parseCurrency(product.price) }\n`),``)
        .concat(`\nTotal: ${ parseCurrency( cart.reduce((total, product) => total + product.price, 0) ) }`),
   [cart],
  )
  
  
  return (
      <Stack spacing={ 6 }>
      <Grid gridGap={6} templateColumns='repeat(auto-fill, minmax(240px, 1fr))'>
        {
          products.map(product => 
          
            <Stack 
              borderRadius='md' 
              padding={ 4 } 
              backgroundColor='gray.100' 
              key={product.id}
              spacing={ 3 }
            >
              <Image 
                alt={product.title}
                cursor='pointer'
                src={ product.image }
                maxHeight={128}
                objectFit='cover'
                borderTopRadius='md'
                />
              <Stack spacing={ 1 }>
                <Text>{ product.title }</Text>
                <Text
                  fontSize='sm'
                  fontWeight='500'
                  color='green.500' 
                >
                  { parseCurrency( product.price ) }
                </Text>
              </Stack>

              <Button 
                onClick={() => setCart(cart => cart.concat(product))} 
                colorScheme='primary'
                size='sm'
                // variant='outline'
                >
                  Agregar
                </Button>
            </Stack>
          )
        }
      </Grid>
      {
        cart.length &&(
        <Flex
          position='sticky'
          bottom={4}
          alignItems='center'
          justifyContent='center'
        >
          <Button 
            as={Link} 
            width='fit-content'
            colorScheme='whatsapp' 
            href={`https://wa.me/67454317?text=${encodeURIComponent(text)}`} 
            isExternal
          >
            Completar pedido ({cart.length} productos)
          </Button>
        </Flex>
      )}
    </Stack>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {

  const products = await api.list();

  return {
    revalidate: 10,
    props: {
      products
    },
  }
}

export default HomeRoute;