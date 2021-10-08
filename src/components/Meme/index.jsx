import React from 'react'

import UltraFastParrot from '../../assets/memes/ultrafast-parrot.gif'

const MEMES = {
  parrot: UltraFastParrot
}

// eslint-disable-next-line react/prop-types
const Meme = ({ name = 'parrot' }) => <img src={MEMES[name]} className="emoji"/>

export default Meme
