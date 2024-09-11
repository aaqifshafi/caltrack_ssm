import { FC, ReactElement } from "react";
import {
  Box,
  CloseButton,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import NavButton from "./NavButton";

const Sidebar: FC<{ onClose: () => void; display?: object }> = ({
  onClose,
  ...rest
}): ReactElement => {
  const bg = useColorModeValue("brand.white", "brand.grey");

  const navigate = useNavigate();

  return (
    <Box
      transition="3s ease"
      bg={bg}
      borderRightWidth="1px"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex alignItems="center" mx="8" justifyContent="space-between">
        <Image
          mt={6}
          w="140px"
          h="90px"
          // eslint-disable-next-line max-len
          src="/src/assets/logo.png"
          alt="Cal Track"
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            navigate("../../");
            onClose();
          }}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <NavButton color={"brand.red"} onClose={onClose}>
        Activity
      </NavButton>
      <NavButton color={"brand.green"} onClose={onClose}>
        Diet
      </NavButton>
      <NavButton color={"brand.blue"} onClose={onClose}>
        Expert
      </NavButton>
    </Box>
  );
};

export default Sidebar;
