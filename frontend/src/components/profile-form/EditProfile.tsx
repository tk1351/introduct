import React, { useState, useEffect, Fragment } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectProfile,
  selectProfileLoading,
  RegisterProfile,
  fetchCurrentProfile,
  createProfile,
} from '../../features/profileSlice'
import Alert from '../layout/Alert'
import { unwrapResult } from '@reduxjs/toolkit'
import { MyKnownError } from '../../features/authSlice'
import { v4 as uuidv4 } from 'uuid'
import { setAlert, removeAlert } from '../../features/alertSlice'

interface Props extends RouteComponentProps {}
const EditProfile = ({ history }: Props) => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const loading = useAppSelector(selectProfileLoading)

  const [formData, setFormData] = useState<RegisterProfile>({
    company: '',
    website: '',
    location: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: '',
  })

  const [displaySocialInputs, toggleSocialInputs] = useState(false)

  useEffect(() => {
    dispatch(fetchCurrentProfile())

    setFormData({
      company: loading || !profile?.company ? '' : profile.company,
      website: loading || !profile?.website ? '' : profile.website,
      location: loading || !profile?.location ? '' : profile.location,
      bio: loading || !profile?.bio ? '' : profile.bio,
      twitter:
        loading || !profile?.social.twitter ? '' : profile.social.twitter,
      facebook:
        loading || !profile?.social.facebook ? '' : profile.social.facebook,
      linkedin:
        loading || !profile?.social.linkedin ? '' : profile.social.linkedin,
      youtube:
        loading || !profile?.social.youtube ? '' : profile.social.youtube,
      instagram:
        loading || !profile?.social.instagram ? '' : profile.social.instagram,
    })
  }, [loading])

  const {
    company,
    website,
    location,
    bio,
    twitter,
    facebook,
    linkedin,
    instagram,
    youtube,
  } = formData

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const profileData: RegisterProfile = formData
    const resultAction = await dispatch(createProfile(profileData))
    if (createProfile.fulfilled.match(resultAction)) {
      unwrapResult(resultAction)
      const id = uuidv4()
      dispatch(
        setAlert({
          id,
          msg: 'プロフィールを編集しました',
          alertType: 'success',
        })
      )
      setTimeout(() => dispatch(removeAlert({ id })), 5000)
    } else if (createProfile.rejected.match(resultAction)) {
      const payloads = resultAction.payload as MyKnownError[]
      payloads.map((payload) => {
        const id = uuidv4()
        dispatch(setAlert({ id, msg: payload.msg, alertType: 'danger' }))
        setTimeout(() => dispatch(removeAlert({ id })), 5000)
      })
    }
  }
  return (
    <Fragment>
      <Alert />
      <h1 className="large text-primary">プロフィールの編集</h1>
      <p className="lead">
        <i className="fas fa-user"></i> 詳細を設定してください
      </p>
      <small>* = 必要事項</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="会社名"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            所属している会社名をご記入ください
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Webサイト"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">会社HPのURLをご記入ください</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="住所"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            住所をご記入ください（例：東京都千代田区）
          </small>
        </div>
        <div className="form-group">
          <textarea
            name="bio"
            placeholder="* 自己紹介"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">自己紹介をご記入ください</small>
        </div>
        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            aria-label="button"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            SNSのリンクを追加する
          </button>
          <span>オプション</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="Youtube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/dashboard" className="btn btn-light my-1">
          戻る
        </Link>
      </form>
    </Fragment>
  )
}

export default EditProfile
