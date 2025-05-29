import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from "@chakra-ui/react";
import { useCurrentUserContext } from "../contexts/UserContext";
import { getCurrentUserSheetMusic } from "../services/SheetMusicService";
import { Link } from "react-router-dom";
import { Tooltip } from "./ui/tooltip";
import { uploadProfilePicture } from "../services/UserService";
import { Toaster, toaster } from "./ui/toaster";
import { SelectFilter } from "./SelectFilter";
import { useSheetMusicContext } from "../contexts/SheetMusicContext";

export default function Profile() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const { sheetMusic, setSheetMusic } = useSheetMusicContext();
  const [loadingScores, setLoadingScores] = useState(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function formatGenre(genre: string) {
    return genre.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentUser && e.target.files?.length) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("profileImageFile", file);

      uploadProfilePicture(currentUser.id, formData)
        .then((updatedUser) => {
          setCurrentUser({ ...currentUser, ...updatedUser });
          toaster.success({
            title: "Profile picture updated",
            description: "Your profile picture has been successfully updated.",
          });
        })
        .catch((error) => {
          console.error("Error uploading profile picture:", error);
        });
    }
  };

  useEffect(() => {
    if (!currentUser?.id) return;
    setLoadingScores(true);
    getCurrentUserSheetMusic(currentUser.id)
      .then(setSheetMusic)
      .catch((error) => {
        console.error("Error fetching user's sheet music:", error);
        setSheetMusic([]);
      })
      .finally(() => setLoadingScores(false));
  }, [currentUser?.id, setSheetMusic]);

  return (
    <>
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-header">
            <div
              className="profile-banner"
              style={
                currentUser?.profileBanner
                  ? {
                      backgroundImage: `url(https://localhost:7189/${currentUser.profileBanner})`,
                    }
                  : { backgroundColor: "var(--primary)" }
              }
            >
              <div className="profile-account-info">
                {currentUser ? (
                  <div className="profile-details">
                    <Tooltip content="Click to change profile image">
                      <div
                        className="profile-image"
                        onClick={handleProfileImageClick}
                      >
                        {currentUser.profilePicture ? (
                          <img
                            src={`https://localhost:7189/${currentUser.profilePicture}`}
                            alt="Profile"
                            className="profile-image"
                          />
                        ) : (
                          <div className="profile-image-placeholder">
                            <span>{currentUser.name?.charAt(0)}</span>
                          </div>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          className="profile-image-input"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleProfileImageChange}
                        />
                      </div>
                    </Tooltip>
                    <div className="profile-username-description">
                      <h2>{currentUser?.name}</h2>
                      <p>{currentUser?.description}</p>
                    </div>
                  </div>
                ) : (
                  <p>Loading user information...</p>
                )}
              </div>
            </div>
            <div className="profile-nav-actions">
              <Button variant={"outline"}>
                <Link to={"/settings"} className="profile-edit-link">
                  Edit Profile
                </Link>
              </Button>
            </div>
          </div>
          <div className="profile-body">
            <div className="profile-scores">
              <div className="profile-scores-title-filter-wrapper">
                <h3>Sheet music</h3>
                <div className="profile-scores-filter">
                  <SelectFilter />
                </div>
              </div>
              {loadingScores ? (
                <p>Loading scores...</p>
              ) : sheetMusic && sheetMusic.length > 0 ? (
                <ul className="profile-scores-list">
                  {sheetMusic.map(
                    (music) =>
                      music.isPublic && (
                        <li key={music.id} className="profile-scores-item">
                          <Link
                            to={`/user/${music.user?.username}/scores/${music.id}`}
                            className="profile-scores-link"
                          >
                            <img
                              src={`https://localhost:7189/${music.previewImage}`}
                              alt={music.title}
                              className="profile-scores-image"
                            />
                          </Link>
                          <Link
                            to={`/user/${music.user?.username}/scores/${music.id}`}
                            className="profile-scores-title"
                          >
                            <h2 className="profile-scores-title">
                              {music.title}
                            </h2>
                          </Link>
                          <p className="profile-scores-composer">
                            {music.composer}
                          </p>
                          <div className="profile-scores-genre-instrument">
                            <p className="profile-scores-instrument">
                              {music.instrument}
                            </p>
                            <span>-</span>
                            <p className="profile-scores-genre">
                              {formatGenre(music.genre)}
                            </p>
                          </div>
                          <p className="profile-scores-author">
                            Uploaded by {music?.user?.name}
                          </p>
                          <p className="profile-scores-date">
                            {new Date(music.uploadedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </li>
                      )
                  )}
                </ul>
              ) : (
                <p>No scores published yet.</p>
              )}
            </div>
            <div className="profile-favorite-scores">
              <div className="profile-favorite-scores-title">
                <h3>Favourites</h3>
              </div>
              <p className="profile-favorite-scores-text">
                You haven't added any scores to your favourites yet.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
