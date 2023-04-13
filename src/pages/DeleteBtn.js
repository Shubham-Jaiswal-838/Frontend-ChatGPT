import { useDisclosure } from "@chakra-ui/hooks";
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import  {RiDeleteBinLine} from "react-icons/ri";


const DeleteBtn = ({id, handleDelete}) => {  
  const { isOpen, onToggle, onClose } = useDisclosure();


  const handleDeleteFun = (id) =>{
     handleDelete(id);
     onClose();

  }

  return (
        <div className="deletebtn" >
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button colorScheme="semibold" onClick={onToggle} >
            <RiDeleteBinLine  className="deltebtn"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent maxWidth="xs">
          <PopoverArrow  />
          <PopoverCloseButton className="popover-color"/>
          <PopoverHeader fontWeight="semibold" className="popover-color" >Confirmation</PopoverHeader>
          <PopoverBody className="popover-color">
            Are you sure you want to continue with your action?
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end" className="popover-color">
            <ButtonGroup size="sm" className="popover-color">
              <Button variant="outline" onClick={onClose} >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => handleDeleteFun(id)}>
                Delete
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DeleteBtn

