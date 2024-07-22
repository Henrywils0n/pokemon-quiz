import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { pkmnNbFromGen } from '../../../utils';

import './style.scss';

import genIconData from '../../../assets/img/gen-icones';

const generations = [
  {
    gen: 1, name: 'Generation 1', icon: genIconData.gen1, alt: 'Bulbizarre',
  },
  {
    gen: 2, name: 'Generation 2', icon: genIconData.gen2, alt: 'Kaiminus',
  },
  {
    gen: 3, name: 'Generation 3', icon: genIconData.gen3, alt: 'Poussifeu',
  },
  {
    gen: 4, name: 'Generation 4', icon: genIconData.gen4, alt: 'Tortipousse',
  },
  {
    gen: 5, name: 'All Generations', alt: 'Tortipousse',
  },
];

function Select() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showPokemonState = useSelector((state) => state.showPokemon);

  const handleClick = (event) => {
    const gen = parseInt(event.target.offsetParent.dataset.gen, 10);
    const pkmnNb = pkmnNbFromGen(gen);
    dispatch({
      type: 'SELECT_GEN',
      gen: gen,
      firstNb: pkmnNb[0],
      lastNb: pkmnNb[1],
    });
    navigate('/quiz');
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    dispatch({
      type: 'SHOW_POKEMON',
      showPokemon: isChecked,
    });
  };

  return (
    <>
      <h2 className="title">Choose a generation (I only played to the first 4 generations)</h2>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <input type="checkbox" defaultChecked={showPokemonState} onChange={handleCheckboxChange} />
        Show Pokemon instead of Shadow
      </label>
      <ul className="Select__gen-list">
        {generations.map(({
          gen, name, icon, alt,
        }) => (
          <li key={gen} className="Select__gen" data-gen={gen} onClick={handleClick}>
            <span>{name}</span>
            {icon && <img className="Select__gen--icon" src={icon} alt={alt} />}
          </li>
        ))}
      </ul>

    </>

  );
}

export default Select;
