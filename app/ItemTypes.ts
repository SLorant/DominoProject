export const ItemTypes = {
  FOREST: 'F',
  WATER: 'W',
  CITY: 'C',
}
/*const [cursor, setCursor] = useState<string>('')
  const getCursorPosition = (x: number) => {
    if (dominoRef.current) {
      const dominoRect = dominoRef.current.getBoundingClientRect()
      const dominoCenter = dominoRect.left + dominoRect.width / 2
      const position = x > dominoCenter ? 'right' : 'left'
      return position
    }
    return ''
  }

  const [initialOffset, setInitialOffset] = useState<null | XYCoord>(null)
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getClientOffset(),
  }))

  if (currentOffset && !initialOffset) {
    setInitialOffset(currentOffset)
  }
  useEffect(() => {
    console.log(initialOffset)
    if (initialOffset) {
      setCursor(getCursorPosition(initialOffset.x))
    }
  }, [initialOffset])

  //console.log('name: ' + name + ' | cursor: ' + cursor)


    useEffect(() => {
    setInitialOffset(null)
  }, [isDragging])
  */

/* <div
            className={` h-16 w-16 ring-2 ring-gray-200 shadow-lg z-20 ${
              hoveredRowIndex === Math.floor(index / 10) ? 'bg-red-400' : 'bg-gray-100'
            }`}
            onMouseEnter={() => handleSquareHover(Math.floor(index / 10))}
            onMouseLeave={() => handleSquareHover(0)}
            key={index}>*/