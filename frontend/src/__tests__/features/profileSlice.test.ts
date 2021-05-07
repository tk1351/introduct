import reducer, {
  ProfileState,
  fetchCurrentProfile,
  ProfileData,
  clearProfile,
  createProfile,
  RegisterProfile,
  deleteProfile,
  fetchAllProfile,
  fetchProfileByUid,
} from '../../features/profileSlice'
import { MyKnownError } from '../../features/authSlice'

describe('profileReducer test', () => {
  describe('fetchCurrentProfile', () => {
    const initialState: ProfileState = {
      profile: null,
      profiles: [],
      loading: true,
      status: 'idle',
      error: null,
    }
    it('[fetchCurrentProfile.pending] Should status return loading', () => {
      const action = { type: fetchCurrentProfile.pending.type }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('loading')
    })
    it('[fetchCurrentProfile.fulfilled] Should state include profile', () => {
      const dummyData: ProfileData = {
        uid: {
          _id: 'dummy _id',
          name: 'dummy name',
          avatar: 'dummy avatar',
        },
        company: 'dummy company',
        website: 'dummy website',
        location: 'dummy location',
        bio: 'dummy bio',
        social: {
          twitter: 'dummy twitter',
          facebook: 'dummy facebook',
          linkedin: 'dummy linkedin',
          instagram: 'dummy instagram',
          youtube: 'dummy youtube',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const action = {
        type: fetchCurrentProfile.fulfilled.type,
        payload: { profile: dummyData },
      }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('succeeded')
      expect(state.profile).toEqual(dummyData)
      expect(state.loading).toBeFalsy()
      expect(state.error).toBeNull()
      expect(state.profiles).toHaveLength(0)
    })
    it('[fetchCurrentProfile.rejected] Should state include error message', () => {
      const dummyMsg: MyKnownError = { msg: 'dummy error' }
      const action = {
        type: fetchCurrentProfile.rejected.type,
        payload: dummyMsg,
      }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('failed')
      expect(state.error).toEqual(dummyMsg)
      expect(state.profile).toBeNull()
      expect(state.profiles).toHaveLength(0)
      expect(state.loading).toBeFalsy()
    })
  })
  describe('clearProfile', () => {
    const initialState: ProfileState = {
      profile: {
        uid: {
          _id: 'dummy _id',
          name: 'dummy name',
          avatar: 'dummy avatar',
        },
        company: 'dummy company',
        website: 'dummy website',
        location: 'dummy location',
        bio: 'dummy bio',
        social: {
          twitter: 'dummy twitter',
          facebook: 'dummy facebook',
          linkedin: 'dummy linkedin',
          instagram: 'dummy instagram',
          youtube: 'dummy youtube',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      status: 'succeeded',
      profiles: [],
      loading: false,
      error: null,
    }
    it('Should state empty', () => {
      const action = { type: clearProfile.type }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('idle')
      expect(state.profile).toBeNull()
      expect(state.profiles).toHaveLength(0)
      expect(state.loading).toBeTruthy()
      expect(state.error).toBeNull()
    })
  })
  describe('createProfile', () => {
    const initialState: ProfileState = {
      profile: null,
      profiles: [],
      loading: true,
      status: 'idle',
      error: null,
    }
    it('[createProfile.pending] Should return status', () => {
      const action = { type: createProfile.pending.type }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('loading')
    })
    it('[createProfile.fulfilled] Should return profile', () => {
      const dummyData: RegisterProfile = {
        company: 'dummy company',
        website: 'dummy website',
        location: 'dummy location',
        bio: 'dummy bio',
        twitter: 'dummy twitter',
        facebook: 'dummy facebook',
        linkedin: 'dummy linkedin',
        instagram: 'dummy instagram',
        youtube: 'dummy youtube',
      }
      const action = {
        type: createProfile.fulfilled.type,
        payload: { profile: dummyData },
      }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('succeeded')
      expect(state.profile?.company).toEqual(dummyData.company)
      expect(state.profiles).toHaveLength(0)
      expect(state.loading).toBeFalsy()
      expect(state.error).toBeNull()
    })
    it('[createProfile.rejected] Should return error message', () => {
      const dummyMsg: MyKnownError = { msg: 'dummy error' }
      const action = { type: createProfile.rejected.type, payload: dummyMsg }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('failed')
      expect(state.error).toEqual(dummyMsg)
      expect(state.profile).toBeNull()
      expect(state.profiles).toHaveLength(0)
      expect(state.loading).toBeFalsy()
    })
  })
  describe('deleteProfile', () => {
    const initialState: ProfileState = {
      profile: {
        uid: {
          _id: 'dummy _id',
          name: 'dummy name',
          avatar: 'dummy avatar',
        },
        company: 'dummy company',
        website: 'dummy website',
        location: 'dummy location',
        bio: 'dummy bio',
        social: {
          twitter: 'dummy twitter',
          facebook: 'dummy facebook',
          linkedin: 'dummy linkedin',
          instagram: 'dummy instagram',
          youtube: 'dummy youtube',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      status: 'succeeded',
      profiles: [],
      loading: false,
      error: null,
    }
    it('[deleteProfile.pending] Should return status', () => {
      const action = { type: deleteProfile.pending.type }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('loading')
    })
    it('[deleteProfile.fulfilled] Should remove profile', () => {
      const action = { type: deleteProfile.fulfilled.type }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('succeeded')
      expect(state.profile).toBeNull()
      expect(state.loading).toBeFalsy()
      expect(state.error).toBeNull()
    })
    it('[deleteProfile.pending] Should return error message', () => {
      const dummyMsg: MyKnownError = { msg: 'dummy error' }
      const action = { type: deleteProfile.rejected.type, payload: dummyMsg }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('failed')
      expect(state.profile).toEqual(initialState.profile)
      expect(state.loading).toBeFalsy()
      expect(state.error).toEqual(dummyMsg)
    })
  })
  describe('fetchAllProfile', () => {
    const initialState: ProfileState = {
      profile: {
        uid: {
          _id: '',
          name: '',
          avatar: '',
        },
        company: '',
        website: '',
        location: '',
        bio: '',
        social: {
          twitter: '',
          facebook: '',
          linkedin: '',
          instagram: '',
          youtube: '',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      status: 'idle',
      profiles: [],
      loading: true,
      error: null,
    }
    it('[fetchAllProfile.pending] Should return status', () => {
      const action = { type: fetchAllProfile.pending.type }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('loading')
    })
    it('[fetchAllProfile.fulfilled] Should return all Profile elements', () => {
      const dummyProfiles: ProfileData[] = [
        {
          uid: {
            _id: 'dummy _id',
            name: 'dummy name',
            avatar: 'dummy avatar',
          },
          company: 'dummy company',
          website: 'dummy website',
          location: 'dummy location',
          bio: 'dummy bio',
          social: {
            twitter: 'dummy twitter',
            facebook: 'dummy facebook',
            linkedin: 'dummy linkedin',
            instagram: 'dummy instagram',
            youtube: 'dummy youtube',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uid: {
            _id: 'dummy _id2',
            name: 'dummy name2',
            avatar: 'dummy avatar2',
          },
          company: 'dummy company2',
          website: 'dummy website2',
          location: 'dummy location2',
          bio: 'dummy bio2',
          social: {
            twitter: 'dummy twitter2',
            facebook: 'dummy facebook2',
            linkedin: 'dummy linkedin2',
            instagram: 'dummy instagram2',
            youtube: 'dummy youtube2',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      const action = {
        type: fetchAllProfile.fulfilled.type,
        payload: { profiles: dummyProfiles },
      }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('succeeded')
      expect(state.profiles).toHaveLength(2)
      expect(state.loading).toBeFalsy()
      expect(state.error).toBeNull()
    })
    it('[fetchAllProfile.rejected] Should return error message', () => {
      const dummyMsg: MyKnownError = { msg: 'dummy error' }
      const action = { type: fetchAllProfile.rejected.type, payload: dummyMsg }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('failed')
      expect(state.error).toEqual(dummyMsg)
      expect(state.profiles).toHaveLength(0)
      expect(state.loading).toBeFalsy()
    })
  })

  // TODO: fetchProfileByUidのテスト記述
  describe('fetchProfileByUid', () => {
    const initialState: ProfileState = {
      profile: {
        uid: {
          _id: '',
          name: '',
          avatar: '',
        },
        company: '',
        website: '',
        location: '',
        bio: '',
        social: {
          twitter: '',
          facebook: '',
          linkedin: '',
          instagram: '',
          youtube: '',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      status: 'idle',
      profiles: [],
      loading: true,
      error: null,
    }
    it('[fetchProfileByUid.pending] Should return status', () => {
      const action = { type: fetchProfileByUid.pending.type }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('loading')
    })
    it('[fetchProfileByUid.fulfilled] Should return Profile by uid', () => {
      const dummyProfile: ProfileData = {
        uid: {
          _id: 'dummy _id',
          name: 'dummy name',
          avatar: 'dummy avatar',
        },
        company: 'dummy company',
        website: 'dummy website',
        location: 'dummy location',
        bio: 'dummy bio',
        social: {
          twitter: 'dummy twitter',
          facebook: 'dummy facebook',
          linkedin: 'dummy linkedin',
          instagram: 'dummy instagram',
          youtube: 'dummy youtube',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const action = {
        type: fetchProfileByUid.fulfilled.type,
        payload: { profile: dummyProfile },
      }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('succeeded')
      expect(state.profile).toEqual(dummyProfile)
      expect(state.loading).toBeFalsy()
      expect(state.error).toBeNull()
    })
    it('[fetchProfileByUid.rejected] Should return error message', () => {
      const dummyMsg: MyKnownError = { msg: 'dummy error' }
      const action = {
        type: fetchProfileByUid.rejected.type,
        payload: dummyMsg,
      }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('failed')
      expect(state.error).toEqual(dummyMsg)
      expect(state.profile).toBeNull()
      expect(state.loading).toBeFalsy()
    })
  })
})
