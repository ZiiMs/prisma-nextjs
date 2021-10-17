import {
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: any;
};

const PostModal = ({ handleSubmit, isOpen, onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a post</ModalHeader>
        <ModalBody>
          <HStack pb={2}>
            <FormControl>
              <Input
                placeholder="Title"
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
            </FormControl>
          </HStack>

          <FormControl>
            <Input
              placeholder="Body"
              value={body}
              onChange={e => {
                setBody(e.target.value);
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            onClick={async e => {
              e.preventDefault();
              await handleSubmit(body, title);
              setBody('');
              setTitle('');
              onClose();
            }}
          >
            Submit
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
