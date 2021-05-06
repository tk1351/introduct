import reducer, {
  ProfileState,
  fetchCurrentProfile,
  Profile,
  clearProfile,
  createProfile,
  RegisterProfile,
  deleteProfile,
} from '../../features/profileSlice'
import { MyKnownError } from 'src/features/authSlice'

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
      const dummyData: Profile = {
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
})
