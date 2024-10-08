/* eslint-disable max-len */
import {
  ChangeEvent,
  FC,
  ReactElement,
  useContext,
  useRef,
  useState,
} from "react";
import {
  Box,
  Text,
  HStack,
  Avatar,
  VStack,
  Heading,
  useColorModeValue,
  Input,
  Button,
  Badge,
} from "@chakra-ui/react";
import { AppContext } from "../../../context/AppContext/AppContext";
import { useLocation } from "react-router-dom";
import { IUserData } from "../../../common/types";
import {
  changeAvatar,
  changeUserRole,
  makeFriends,
  resolveRequestByRecipient,
  resolveRequestBySender,
  sendFriendRequest,
  unFriend,
} from "../../../services/user.services";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { UserRoles } from "../../../common/enums";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const ProfileHeader: FC<{ profile: IUserData }> = ({
  profile,
}): ReactElement => {
  const { userData } = useContext(AppContext);

  const [loadingBtn, setLoadingBtn] = useState(false);

  const location = useLocation();

  const contrastColor = useColorModeValue("brand.dark", "brand.light");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isMe = profile.handle === userData!.handle;
  const amAdmin = userData!.role === UserRoles.Admin;
  const amAppliedForAdmin = userData!.role === UserRoles.WantAdmin;
  const isAdmin = profile.role === UserRoles.Admin;
  const isFriend = userData!.friends
    ? Object.keys(userData!.friends).includes(profile.handle)
    : false;
  const hasReceivedRequest = userData!.receivedFriendRequests
    ? Object.keys(userData!.receivedFriendRequests).includes(profile.handle)
    : false;
  const hasSentRequest = userData!.sentFriendRequests
    ? Object.keys(userData!.sentFriendRequests).includes(profile.handle)
    : false;

  const handleAvatarClick = () => {
    if (isMe && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      changeAvatar(userData!.handle, files[0]);
    }
  };

  const handleAddFriend = () => {
    setLoadingBtn(true);
    sendFriendRequest(userData!.handle, profile.handle).then(() =>
      setLoadingBtn(false)
    );
  };

  const handleWithdrawFriendRequest = () => {
    setLoadingBtn(true);
    resolveRequestBySender(userData!.handle, profile.handle).then(() =>
      setLoadingBtn(false)
    );
  };

  const handleAcceptFriendRequest = () => {
    setLoadingBtn(true);
    resolveRequestByRecipient(userData!.handle, profile.handle)
      .then(() => makeFriends(userData!.handle, profile.handle))
      .then(() => setLoadingBtn(false));
  };

  const handleRejectFriendRequest = () => {
    setLoadingBtn(true);
    resolveRequestByRecipient(userData!.handle, profile.handle).then(() =>
      setLoadingBtn(false)
    );
  };

  const handleRemoveFriend = () => {
    setLoadingBtn(true);
    unFriend(userData!.handle, profile.handle).then(() => setLoadingBtn(false));
  };

  const handleApplyForAdmin = () => {
    setLoadingBtn(true);
    changeUserRole(userData!.handle, UserRoles.WantAdmin).then(() =>
      setLoadingBtn(false)
    );
  };

  const handleUnapplyForAdmin = () => {
    setLoadingBtn(true);
    changeUserRole(userData!.handle, UserRoles.Base).then(() =>
      setLoadingBtn(false)
    );
  };

  return (
    <VStack w="100%" gap={1}>
      <Box p={1} bg={contrastColor} rounded="2xl">
        <Avatar
          src={profile.avatarURL}
          name={`${profile.firstName} ${profile.lastName}`}
          borderRadius="xl"
          boxSize="120px"
          cursor={isMe ? "pointer" : "default"}
          loading="eager"
          onClick={handleAvatarClick}
        />
        <Input
          type="file"
          id="upload"
          ref={fileInputRef}
          accept="image/png, image/jpg, image/jpeg"
          display="none"
          onChange={handleFileSelect}
        />
      </Box>
      <Heading
        as="h2"
        size="md"
      >{`${profile.firstName} ${profile.lastName}`}</Heading>
      <HStack>
        <Text>@{profile.handle}</Text>
        <VStack>
          {isFriend && (
            <Badge colorScheme="teal" size="md">
              Friend
            </Badge>
          )}
          {isAdmin && (
            <Badge colorScheme="purple" size="md">
              Admin
            </Badge>
          )}
        </VStack>
      </HStack>
      {!isMe && (
        <HStack>
          {!isFriend ? (
            hasReceivedRequest ? (
              <>
                <Button
                  colorScheme="teal"
                  leftIcon={<AiOutlineUserAdd />}
                  size="sm"
                  isLoading={loadingBtn}
                  onClick={handleAcceptFriendRequest}
                >
                  Accept Friend
                </Button>
                <Button
                  colorScheme="pink"
                  variant="outline"
                  leftIcon={<AiOutlineUserDelete />}
                  size="sm"
                  isLoading={loadingBtn}
                  onClick={handleRejectFriendRequest}
                >
                  Reject Friend
                </Button>
              </>
            ) : !hasSentRequest ? (
              <Button
                colorScheme="teal"
                leftIcon={<AiOutlineUserAdd />}
                size="sm"
                isLoading={loadingBtn}
                onClick={handleAddFriend}
              >
                Add Friend
              </Button>
            ) : (
              <Button
                colorScheme="teal"
                variant="outline"
                leftIcon={<AiOutlineUserAdd />}
                isLoading={loadingBtn}
                size="sm"
                onClick={handleWithdrawFriendRequest}
              >
                Request Sent
              </Button>
            )
          ) : (
            <Button
              colorScheme="pink"
              variant="outline"
              leftIcon={<AiOutlineUserDelete />}
              size="sm"
              isLoading={loadingBtn}
              onClick={handleRemoveFriend}
            >
              Remove Friend
            </Button>
          )}
        </HStack>
      )}
      {isMe &&
        !amAdmin &&
        (!amAppliedForAdmin ? (
          <Button
            colorScheme="orange"
            leftIcon={<MdOutlineAdminPanelSettings />}
            size="sm"
            isLoading={loadingBtn}
            onClick={handleApplyForAdmin}
          >
            Apply for Admin
          </Button>
        ) : (
          <Button
            colorScheme="orange"
            variant="outline"
            leftIcon={<MdOutlineAdminPanelSettings />}
            size="sm"
            isLoading={loadingBtn}
            onClick={handleUnapplyForAdmin}
          >
            Applied for Admin
          </Button>
        ))}
      <HStack gap={2}></HStack>
    </VStack>
  );
};

export default ProfileHeader;
