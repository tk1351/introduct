import reducer, {
  setAlert,
  removeAlert,
  AlertState,
} from '../../features/alertSlice'

describe('alertReducer test', () => {
  describe('setAlert', () => {
    let initialState: AlertState[] = [{ id: '', msg: '', alertType: '' }]
    it('Should setAlert', () => {
      const dummyAlert: AlertState = {
        id: '1',
        msg: 'dummy msg',
        alertType: 'dummy alertType',
      }
      expect(initialState).toHaveLength(1)
      const action = { type: setAlert.type, payload: dummyAlert }
      const state = reducer(initialState, action)
      expect(state).toHaveLength(2)
    })
  })
  describe('removeAlert', () => {
    let initialState: AlertState[] = [
      { id: '', msg: '', alertType: '' },
      { id: '1', msg: 'dummy msg', alertType: 'dummy alertType' },
    ]
    it('Should removeAlert', () => {
      expect(initialState).toHaveLength(2)
      const action = { type: removeAlert.type, payload: { id: '1' } }
      const state = reducer(initialState, action)
      expect(state).toHaveLength(1)
    })
  })
})
