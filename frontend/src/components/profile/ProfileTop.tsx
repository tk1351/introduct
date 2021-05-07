import React, { FC } from 'react'
import { ProfileData } from '../../features/profileSlice'

type Props = {
  profile: ProfileData
}

const ProfileTop: FC<Props> = ({ profile }) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img
        src={profile.uid.avatar}
        className="round-img my-1"
        aria-label="avatar"
      />
      <h1 className="large">{profile.uid.name}</h1>
      <p className="lead">
        {profile.company && (
          <span aria-label="company">企業: {profile.company}</span>
        )}
      </p>
      <p>
        {profile.location && (
          <span aria-label="location">住所: {profile.location}</span>
        )}
      </p>
      <div className="icons my-1">
        {profile.website && (
          <a href={profile.website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x" aria-label="website"></i>
          </a>
        )}
        {profile.social && profile.social.twitter && (
          <a
            href={profile.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter fa-2x" aria-label="twitter"></i>
          </a>
        )}
        {profile.social && profile.social.facebook && (
          <a
            href={profile.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook fa-2x" aria-label="facebook"></i>
          </a>
        )}
        {profile.social && profile.social.linkedin && (
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin fa-2x" aria-label="linkedin"></i>
          </a>
        )}
        {profile.social && profile.social.instagram && (
          <a
            href={profile.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram fa-2x" aria-label="instagram"></i>
          </a>
        )}
        {profile.social && profile.social.youtube && (
          <a
            href={profile.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube fa-2x" aria-label="youtube"></i>
          </a>
        )}
      </div>
    </div>
  )
}

export default ProfileTop
