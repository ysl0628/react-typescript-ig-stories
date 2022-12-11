import { Dispatch, SetStateAction } from 'react'
import { useAppDispatch } from '../../../hooks/useRedux'
import {
  play,
  setCarouselStyle,
  setCurrentUser,
} from '../../../store/reducers/slideSlice'

type ProfileProps = {
  index: number
  id: string
  username?: string
  url: string
  posts: string[]
  setModalShow: Dispatch<SetStateAction<boolean>>
  setClickTime: Dispatch<SetStateAction<number | null>>
}
export default function Profile({
  index,
  id,
  url,
  setClickTime,
  setModalShow,
}: ProfileProps) {
  const dispatch = useAppDispatch()

  return (
    <>
      <div
        id={id}
        className="content"
        onClick={() => {
          setModalShow((prev) => !prev)
          setClickTime(new Date().valueOf())
          dispatch(setCurrentUser(index))
          dispatch(setCarouselStyle('translateZ(-500px)'))
          dispatch(play(true))
        }}
      >
        <img src={url} alt="" />
      </div>
    </>
  )
}
