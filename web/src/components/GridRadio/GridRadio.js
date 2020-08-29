import { useState } from 'react'
import classNames from 'classnames'

const GridRadio = ({
  list = [],
  cols = 3,
  onSelect = () => {},
  titleProp = 'title',
}) => {
  const [selected, setSelected] = useState(0)
  const switchRadio = (index) => {
    console.log(index)
    setSelected(index)
    onSelect(list[index])
  }
  return (
    <div
      className={classNames('grid', 'gap-2', 'mt-2', {
        ['grid-cols-' + cols]: true,
      })}
    >
      {list.map((item, index) => (
        <span
          onClick={() => switchRadio(index)}
          key={index}
          className={classNames('text-white', 'rouded', 'p-2', {
            'bg-green-500': selected === index,
            'bg-gray-600': selected !== index,
          })}
        >
          {item[titleProp]}
        </span>
      ))}
    </div>
  )
}

export default GridRadio
