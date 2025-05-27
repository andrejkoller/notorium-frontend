import { useEffect } from "react";
import { getCurrentUser } from "../services/UserService";
import { Card, Dialog, Portal } from "@chakra-ui/react";
import ProfileDialog from "./dialogs/ProfileDialog";
import { useCurrentUser } from "../contexts/UserContext";

export default function MyProfile() {
  const { currentUser, setCurrentUser } = useCurrentUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [setCurrentUser]);

  return (
    <Dialog.Root>
      <Card.Root className="profile-card">
        <Card.Body className="profile-body">
          {currentUser ? (
            <div className="profile-details">
              <div className="profile-details-wrapper">
                <div className="profile-image">
                  <span>{currentUser.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="profile-username">
                  <p>Profile</p>
                  <div className="profile-username-text">
                    <Dialog.Trigger asChild>
                      <h2>{currentUser.name}</h2>
                    </Dialog.Trigger>
                    <p>@{currentUser.username}</p>
                  </div>
                </div>
              </div>
              <div className="profile-description">
                <p>{currentUser.description || "No description provided."}</p>
              </div>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <ProfileDialog
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
          <div className="profile-scores">
            <div className="profile-scores-title">
              <h3>Last published scores</h3>
            </div>
            <div className="profile-scores-list"></div>
          </div>
        </Card.Body>
      </Card.Root>
    </Dialog.Root>
  );
}
