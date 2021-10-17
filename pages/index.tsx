/* eslint-disable react-hooks/rules-of-hooks */
import type { GetServerSideProps } from 'next';
import {
  Box,
  Button,
  Container,
  useColorModeValue,
  Divider,
  Text,
  VStack,
  Heading,
  HStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import DBClient from '@/utils/database';
import { Post, Author } from '@prisma/client';
import PostModal from '@/components/dialogs/postModal';
import CreateAccount from '@/components/dialogs/createAccount';
import LoginDialog from '@/components/dialogs/loginModal';

type PostProp = {
  id?: string;
  title: string;
  body: string;
  authorId: string;
  Author: Author;
};

type loginProps = {
  id: string;
  name: string;
  email: string;
  date: Date;
  error: string;
};

const Home = ({ initialPosts }: any) => {
  const [posts, setPosts] = useState<PostProp[]>(initialPosts);
  const [author, setAuthor] = useState<Author | undefined>();
  const [openId, setOpenId] = useState(0);

  const onClose = () => {
    setOpenId(0);
  };

  const savePost = async (title: string, body: string) => {
    if(!author) {
      throw new Error("Error: No Author.")
    }
    const authorId = author.id;
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, body, authorId })
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const post = await response.json()
    console.log(post)
    setPosts(prevState => [...prevState, {...post, Author: author}]);

    onClose();
    return post;
  };

  const loginAccount = async (name: string, email: string) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ name, email })
    });


    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // setPosts((prevState) => [...prevState, {title, authorId, body}]);

    const data: loginProps = await response.json();
    if(data.error) {
      console.log(data.error)
    } else {
      onClose();
      setAuthor(data);
    }

    return data
  };

  const saveAccount = async (name: string, email: string) => {
    const response = await fetch('/api/createAccount', {
      method: 'POST',
      body: JSON.stringify({ name, email })
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // setPosts((prevState) => [...prevState, {title, authorId, body}]);

    onClose();
    const data: Author = await response.json();
    setAuthor(data);
    return data;
  };

  return (
    <Container centerContent maxW="container.md" display="flex" w="full">
      <VStack flex={1} alignItems="center" spacing={4} w="full">
        <HStack>
          <Text>Thjis is a test</Text>
          <Button
            onClick={e => {
              e.preventDefault();
              setOpenId(1);
            }}
            disabled={author ? false : true}
          >
            Open Modal
          </Button>
          <Button
            onClick={e => {
              e.preventDefault();
              setOpenId(2);
            }}
            disabled={author ? true : false}
          >
            Create Account
          </Button>
          <Button
            onClick={e => {
              e.preventDefault();
              setOpenId(3);
            }}
            disabled={author ? true : false}
          >
            Login
          </Button>
        </HStack>
        <Divider />
        <VStack>
          {posts.map((post: PostProp, i: number) => (
            <Box
              key={i}
              w="full"
              maxW="2xl"
              py={4}
              px={6}
              rounded={'md'}
              boxShadow={'md'}
              overflow="hidden"
              bg={useColorModeValue('white', 'gray.900')}
            >
              <VStack spacing={3}>
                <HStack spacing={12}>
                  <Heading fontSize="2xl">{post.title}</Heading>
                  <HStack spacing={3}>
                    <Text
                      fontSize="xs"
                      color={useColorModeValue('gray.400', 'gray.500')}
                    >
                      {post.Author.name}
                    </Text>
                    <Text
                      fontSize="xs"
                      color={useColorModeValue('gray.400', 'gray.500')}
                    >
                      {post.Author.date}
                    </Text>
                  </HStack>
                </HStack>
                <Text>{post.body}</Text>
              </VStack>
            </Box>
          ))}
        </VStack>
      </VStack>
      <PostModal
        isOpen={openId == 1}
        onClose={onClose}
        handleSubmit={savePost}
      />
      <CreateAccount
        isOpen={openId == 2}
        onClose={onClose}
        handleSubmit={saveAccount}
      />
      <LoginDialog
        isOpen={openId == 3}
        onClose={onClose}
        handleSubmit={loginAccount}
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = DBClient.getInstance().prisma;

  const posts: (Post & { Author: Author })[] = await prisma.post.findMany({
    include: {
      Author: true
    }
  });

  return {
    props: {
      initialPosts: posts.map((post: Post & { Author: Author }) => ({
        ...post,
        Author: {
          ...post.Author,
          date: post.Author.date.toISOString()
        }
      }))
    }
  };
};

export default Home;
