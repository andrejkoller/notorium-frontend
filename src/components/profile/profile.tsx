import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from "@chakra-ui/react";
import { useCurrentUserContext } from "../../contexts/user-context";
import {
  getCurrentUserSheetMusic,
  getSheetMusicFavorites,
} from "../../services/sheet-music-service";
import { Link } from "react-router-dom";
import { Tooltip } from "../ui/tooltip";
import { uploadBannerImage, uploadProfileImage } from "../../services/user-service";
import { Toaster, toaster } from "../ui/toaster";
import { SelectFilter } from "../select-filter/select-filter";
import { useSheetMusicContext } from "../../contexts/sheet-music-context";
import { Camera, ImageIcon, UserRoundPen } from "lucide-react";
import type { SheetMusic } from "../../models/sheet-music";

export default function Profile() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const { sheetMusic, setSheetMusic } = useSheetMusicContext();
  const [loadingScores, setLoadingScores] = useState(true);

  const [favoriteSheetMusic, setFavoriteSheetMusic] = useState<SheetMusic[]>(
    []
  );

  const profileImageInputRef = useRef<HTMLInputElement | null>(null);
  const bannerImageInputRef = useRef<HTMLInputElement | null>(null);

  function formatGenre(genre: string) {
    return genre.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  const handleProfileImageClick = () => {
    profileImageInputRef.current?.click();
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentUser && e.target.files?.length) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("profileImageFile", file);

      uploadProfileImage(currentUser.id, formData)
        .then((updatedUser) => {
          setCurrentUser({ ...currentUser, ...updatedUser });
          toaster.success({
            title: "Profile image updated",
            description: "Your profile image has been successfully updated.",
          });
        })
        .catch((error) => {
          console.error("Error uploading profile image:", error);
          toaster.error({
            title: "Error updating profile image",
            description: "There was an error updating your profile image.",
          });
        });
    }
  };

  const handleBannerImageClick = () => {
    bannerImageInputRef.current?.click();
  };

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentUser && e.target.files?.length) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("bannerImageFile", file);

      uploadBannerImage(currentUser.id, formData)
        .then((updatedUser) => {
          setCurrentUser({ ...currentUser, ...updatedUser });
          toaster.success({
            title: "Banner image updated",
            description: "Your banner image has been successfully updated.",
          });
        })
        .catch((error) => {
          console.error("Error uploading banner image:", error);
          toaster.error({
            title: "Error updating banner image",
            description: "There was an error updating your banner image.",
          });
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

  useEffect(() => {
    if (!currentUser?.id) return;
    getSheetMusicFavorites(currentUser.id)
      .then((favorites) => {
        setFavoriteSheetMusic(favorites);
      })
      .catch((error) => {
        console.error("Error fetching user's favorite sheet music:", error);
        setFavoriteSheetMusic([]);
      });
  }, [currentUser?.id]);

  return (
    <>
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-header">
            <div
              className="profile-banner"
              style={
                currentUser?.bannerImage
                  ? {
                      backgroundImage: `url(https://localhost:7189/${currentUser.bannerImage})`,
                    }
                  : { backgroundColor: "var(--primary)" }
              }
              onClick={handleBannerImageClick}
            >
              <div className="profile-account-info">
                {currentUser ? (
                  <div className="profile-details">
                    <Tooltip content="Click to change profile image">
                      <div
                        className="profile-image"
                        onClick={handleProfileImageClick}
                      >
                        {currentUser.profileImage ? (
                          <img
                            src={`https://localhost:7189/${currentUser.profileImage}`}
                            alt="Profile"
                            className="profile-image"
                          />
                        ) : (
                          <div className="profile-image-placeholder">
                            <span>{currentUser.name?.charAt(0)}</span>
                          </div>
                        )}
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
              <Button variant={"outline"} onClick={handleProfileImageClick}>
                <Camera className="profile-edit-icon" />
                <span>Change Profile Image</span>
                <Input
                  type="file"
                  accept="image/*"
                  className="profile-image-input"
                  ref={profileImageInputRef}
                  style={{ display: "none" }}
                  onChange={handleProfileImageChange}
                />
              </Button>
              <Button variant={"outline"} onClick={handleBannerImageClick}>
                <ImageIcon className="profile-edit-icon" />
                <span>Change Banner</span>
                <Input
                  type="file"
                  accept="image/*"
                  className="profile-banner-input"
                  style={{ display: "none" }}
                  ref={bannerImageInputRef}
                  onChange={handleBannerImageChange}
                />
              </Button>
              <Button variant={"outline"}>
                <Link to={"/settings"} className="profile-edit-link">
                  <UserRoundPen className="profile-edit-icon" />
                  <span>Edit Profile</span>
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
              {favoriteSheetMusic && favoriteSheetMusic.length > 0 ? (
                <ul className="profile-favorite-scores-list">
                  {favoriteSheetMusic.map((music) => (
                    <li key={music.id} className="profile-favorite-scores-item">
                      <Link
                        to={`/user/${music.user?.username}/scores/${music.id}`}
                        className="profile-favorite-scores-link"
                      >
                        <img
                          src={`https://localhost:7189/${music.previewImage}`}
                          alt={music.title}
                          className="profile-favorite-scores-image"
                        />
                      </Link>
                      <Link
                        to={`/user/${music.user?.username}/scores/${music.id}`}
                        className="profile-favorite-scores-title"
                      >
                        <h2 className="profile-favorite-scores-title">
                          {music.title}
                        </h2>
                      </Link>
                      <p className="profile-favorite-scores-composer">
                        {music.composer}
                      </p>
                      <div className="profile-favorite-scores-genre-instrument">
                        <p className="profile-favorite-scores-instrument">
                          {music.instrument}
                        </p>
                        <span>-</span>
                        <p className="profile-favorite-scores-genre">
                          {formatGenre(music.genre)}
                        </p>
                      </div>
                      <p className="profile-favorite-scores-author">
                        Uploaded by {music?.user?.name}
                      </p>
                      <p className="profile-favorite-scores-date">
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
                  ))}
                </ul>
              ) : (
                <p>You haven't added any scores to your favourites yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
