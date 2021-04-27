import React, { FC, useState, Fragment } from 'react'

const CreateProfile: FC = () => {
  const [formData, setFormData] = useState({
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
  return (
    <Fragment>
      <h1 className="large text-primary">プロフィール設定</h1>
      <p className="lead">
        <i className="fas fa-user"></i> 詳細を設定してください
      </p>
      <small>* = 必要事項</small>
      <form className="form">
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
        <a href="dashboard.html" className="btn btn-light my-1">
          戻る
        </a>
      </form>
    </Fragment>
  )
}

export default CreateProfile
