import { useEffect, useState, useRef } from "react";
import { useCurrentUserContext } from "../../hooks/use-current-user";
import {
  getCurrentUserSheetMusic,
  getSheetMusicFavorites,
} from "../../services/sheet-music-service";
import { Link } from "react-router-dom";
import SelectFilter from "../select-filter/select-filter";
import { useSheetMusicContext } from "../../hooks/use-sheet-music";
import type { SheetMusic } from "../../models/sheet-music";
import "./profile.css";
import {
  uploadProfileImage,
  uploadBannerImage,
} from "../../services/user-service";

function Profile() {
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
        })
        .catch((error) => {
          console.error("Error uploading profile image:", error);
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
        })
        .catch((error) => {
          console.error("Error uploading banner image:", error);
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
    <div className="profile-container">
      <input
        type="file"
        ref={profileImageInputRef}
        onChange={handleProfileImageChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <input
        type="file"
        ref={bannerImageInputRef}
        onChange={handleBannerImageChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <div className="profile-content">
        <div className="profile-header">
          {currentUser ? (
            <div className="profile-details" onClick={handleBannerImageClick}>
              <div className="profile-image" onClick={handleProfileImageClick}>
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
              <div className="profile-username">
                <p>Profile</p>
                <h2>{currentUser.username}</h2>
              </div>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </div>
        <div className="profile-body">
          <div className="profile-scores">
            <div className="profile-scores-wrapper">
              <h3>Published Scores ({sheetMusic ? sheetMusic.length : 0})</h3>
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
                          to={`/dashboard/users/${music.user?.username}/scores/${music.id}`}
                          className="profile-scores-link"
                        >
                          <img
                            src={`https://localhost:7189/${music.previewImage}`}
                            alt={music.title}
                            className="profile-scores-image"
                          />
                        </Link>
                        <Link
                          to={`/dashboard/users/${music.user?.username}/scores/${music.id}`}
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
              <p className="profile-scores-no-scores">
                No scores published yet.
              </p>
            )}
          </div>
          <div className="profile-favorite-scores">
            <div className="profile-favorite-scores-title">
              <h3>
                Favourite Scores (
                {favoriteSheetMusic ? favoriteSheetMusic.length : 0})
              </h3>
            </div>
            {favoriteSheetMusic && favoriteSheetMusic.length > 0 ? (
              <ul className="profile-favorite-scores-list">
                {favoriteSheetMusic.map((music) => (
                  <li key={music.id} className="profile-favorite-scores-item">
                    <Link
                      to={`/dashboard/users/${music.user?.username}/scores/${music.id}`}
                      className="profile-favorite-scores-link"
                    >
                      <img
                        src={`https://localhost:7189/${music.previewImage}`}
                        alt={music.title}
                        className="profile-favorite-scores-image"
                      />
                    </Link>
                    <Link
                      to={`/dashboard/users/${music.user?.username}/scores/${music.id}`}
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
                      {new Date(music.uploadedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="profile-favorite-scores-no-scores">
                You haven't added any scores to your favourites yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
