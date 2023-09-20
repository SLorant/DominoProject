import { useEffect, useState, memo, FC } from 'react'
import { ScoreBoardProps } from '../../../_components/Interfaces'
import { MiniSquare } from './MiniSquare'
import { ItemTypes } from '../../../_types/ItemTypes'
import { SquareState } from '../../../_components/Interfaces'
import { mapLength } from './MapConfig'
import Image from 'next/image'

export const ScoreBoard: FC<ScoreBoardProps> = memo(function ScoreBoard({ uniqueId, playerInfos, readBoards }) {
  const [rankedPlayers, setRankedPlayers] = useState<{ playerId: string; rank: number; name: string; avatar: string }[]>([])

  useEffect(() => {
    // Calculate the rank for each player
    const rankedPlayersData = Object.entries(playerInfos).map(([playerId, { score, name, avatar }]) => ({
      playerId,
      score,
      name,
      avatar,
    }))
    rankedPlayersData.sort((a, b) => b.score - a.score)

    setRankedPlayers(
      rankedPlayersData.map((player, index) => ({
        playerId: player.playerId,
        name: player.name,
        avatar: player.avatar,
        rank: index + 1,
      })),
    )
  }, [playerInfos])

  const getRankByPlayerId = (playerId: string): number => {
    const playerData = rankedPlayers.find((player) => player.playerId === playerId)
    if (playerData) return playerData.rank
    else return 2
  }
  const [currentBoard, setCurrentBoard] = useState(0)
  const handleNextBoard = () => {
    if (Object.keys(readBoards).length - 1 === currentBoard) setCurrentBoard(0)
    else setCurrentBoard(currentBoard + 1)
  }
  const handlePrevBoard = () => {
    if (currentBoard === 0) setCurrentBoard(Object.keys(readBoards).length - 1)
    else setCurrentBoard(currentBoard - 1)
  }
  const [scoreBoardOpened, setScoreBoardOpened] = useState<boolean>(false)
  const openScoreBoard = () => {
    setScoreBoardOpened(!scoreBoardOpened)
    /* const element: HTMLElement = document.getElementById('slide-in')

    element.classList.remove('slide-in') // reset animation
    void element.offsetWidth // trigger reflow
    element.classList.add('slide-in') // start animation */
  }
  const initialSquares: SquareState[] = Array.from({ length: mapLength }).map(() => ({
    accepts: [ItemTypes.DOMINO],
    lastDroppedItem: null,
    hasStar: false,
  }))

  const firstPlayerSquares = Object.values(readBoards)[currentBoard] ? Object.values(readBoards)[currentBoard][0] : initialSquares
  const boardName: string = Object.values(readBoards)[currentBoard] ? Object.values(readBoards)[currentBoard][1] : ''

  const emptyRows = new Array(6 - Object.keys(playerInfos).length).fill(null)

  return (
    <div
      id="slide-in"
      className={`${
        scoreBoardOpened
          ? 'w-screen h-screen  transform-gpu duration-200 transition ease-in-out absolute bottom-0 left-0 z-50 flex flex-col justify-end items-end'
          : ''
      }`}>
      <button
        id="scoreArrow"
        className={`${scoreBoardOpened ? '-translate-y-[600px] transform-gpu duration-200 transition ease-in-out static z-50' : ''}
      absolute w-full bottom-0 h-[48px] left-0 flex items-center justify-center bg-lightpurple md:hidden`}
        onClick={openScoreBoard}>
        <svg width="47" height="21" viewBox="0 0 47 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M47 19.9298L23.651 -1.02062e-06L0.236751 20.043L23.651 15.1738L47 19.9298Z" fill="white" />
        </svg>
      </button>
      <aside
        id="fade-in"
        className={`${scoreBoardOpened ? 'w-full ' : 'hidden md:flex'}
      mt-24 lg:mt-12 w-[335px] bg-grey flex flex-col h-[600px] md:h-[500px] justify-start items-center gap-2 relative`}>
        <div className="flex flex-col text-xl text-white w-full items-center text-center">
          {Object.entries(playerInfos).map(([playerId, { name, score, avatar }]) => (
            <div
              key={playerId}
              className={`${
                getRankByPlayerId(playerId) % 2 === 0 ? 'bg-lightpurple md:bg-grey' : 'bg-grey md:bg-lightpurple'
              } text-darkblue w-full h-12 md:h-10 justify-start items-center flex relative`}>
              <div className="ml-4">{getRankByPlayerId(playerId)}</div>
              <div className="ml-4">
                <Image height={30} width={30} src={`/avatars/avatars-${avatar}.png`} alt="playeravatar" unoptimized></Image>
              </div>
              <div className="ml-4 text-lg">{playerId === uniqueId ? name + ' (you)' : name}</div>
              <div className="mr-4 absolute right-2">{score} p</div>
            </div>
          ))}
          {Object.entries(emptyRows).map((_, index) => (
            <div
              key={index}
              className={`${
                emptyRows.length % 2 === 0
                  ? index % 2 === 0
                    ? 'bg-grey md:bg-lightpurple'
                    : 'bg-lightpurple md:bg-grey'
                  : (index + 1) % 2 === 0
                  ? 'bg-grey md:bg-lightpurple'
                  : 'bg-lightpurple md:bg-grey'
              }
             text-darkblue w-full h-12 justify-start items-center flex `}></div>
          ))}
        </div>
        <div className="absolute bottom-12 md:bottom-8 gap-4 flex h-[200px] md:h-[165px] w-[240px] ">
          <button className="z-20 text-3xl text-white mb-2" onClick={handlePrevBoard}>
            &#10094;
          </button>
          <div className="flex flex-col items-center justify-center">
            <div className="h-[196px] w-[196px] md:h-[165px] md:w-[165px] grid grid-cols-7 grid-rows-7">
              {firstPlayerSquares.map(({ accepts, lastDroppedItem, hasStar }, squareIndex) => (
                <MiniSquare accept={accepts} lastDroppedItem={lastDroppedItem} hasStar={hasStar} index={squareIndex} key={`${squareIndex}`} />
              ))}
            </div>
            <p className="text-darkblue mt-2">{boardName}'s map</p>
          </div>
          <button className="z-20 text-3xl text-white mb-2" onClick={handleNextBoard}>
            &#10095;
          </button>
        </div>
      </aside>
    </div>
  )
})

export default ScoreBoard