import * as types from './mutations-type'

export const selectSong = ({commit, state}, {list, index}) => {
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
}
