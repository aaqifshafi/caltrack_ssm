import { FC, ReactElement } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { IGoal } from "../../../common/types";
import EditGoal from "../../Goals/EditGoal/EditGoal";
import GoalLog from "../../Goals/GoalLog/GoalLog";

const OptionsButton: FC<{ goal?: IGoal }> = ({ goal }): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenLog,
    onOpen: onOpenLog,
    onClose: onCloseLog,
  } = useDisclosure();

  return (
    <Flex
      justifyContent="center"
      mt={4}
      position="absolute"
      top={0}
      right={3}
      zIndex={1}
    >
      {goal && <EditGoal isOpen={isOpen} onClose={onClose} goal={goal} />}
      {goal && isOpenLog && (
        <GoalLog isOpen={isOpenLog} onClose={onCloseLog} goal={goal} />
      )}
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="More options"
            icon={<BsThreeDotsVertical />}
            variant="solid"
            w="fit-content"
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
          <PopoverArrow />
          <PopoverBody></PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default OptionsButton;
