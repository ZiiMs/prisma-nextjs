import { Button, FormControl, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React, {  useState } from "react";


type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: any;
}


const CreateAccount = ({handleSubmit, isOpen,onClose}: Props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');


  return (
          <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Account</ModalHeader>
          <ModalBody>
          <HStack pb={2}>
            <FormControl>
              <Input placeholder='Username' value={name} onChange={(e) => {setName(e.target.value)}}/>
            </FormControl>
          </HStack>

          <FormControl>
            <Input placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={async (e) => {
              e.preventDefault();
              await handleSubmit(name, email);
              setEmail('')
              setName('')
              onClose()
            }}>Create</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default CreateAccount