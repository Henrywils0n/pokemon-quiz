import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { pkmnNbFromGen } from '../../../utils';

import './style.scss';

import genIconeData from '../../../assets/img/gen-icones';

function Select() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    const gen = parseInt(event.target.offsetParent.dataset.gen, 10);
    const pkmnNb = pkmnNbFromGen(gen);
    dispatch({
      type: 'SELECT_GEN',
      gen: gen,
      firstNb: pkmnNb[0],
      lastNb: pkmnNb[1],
    });
    navigate('/quizz');
  };

  return (
    <>
      <h2 className="title">Choisissez une génération</h2>
      <ul className="Select__gen-list">
        <li className="Select__gen" data-gen="1" onClick={handleClick}>
          <span>• Génération 1</span>
          <img className="Select__gen--icone" src={genIconeData.gen1} alt="Bulbizarre" />
        </li>
        <li className="Select__gen" data-gen="2" onClick={handleClick}>
          <span>• Génération 2</span>
          <img className="Select__gen--icone" src={genIconeData.gen2} alt="Kaiminus" />
        </li>
        <li className="Select__gen" data-gen="3" onClick={handleClick}>
          <span>• Génération 3</span>
          <img className="Select__gen--icone" src={genIconeData.gen3} alt="Poussifeu" />
        </li>
        <li className="Select__gen" data-gen="4" onClick={handleClick}>
          <span>• Génération 4</span>
          <img className="Select__gen--icone" src={genIconeData.gen4} alt="Tortipousse" />
        </li>
        <li className="Select__gen" data-gen="5" onClick={handleClick}>
          <span>• Génération 5</span>
          <img className="Select__gen--icone" src={genIconeData.gen5} alt="Moustillon" />
        </li>
        <li className="Select__gen" data-gen="6" onClick={handleClick}>
          <span>• Génération 6</span>
          <img className="Select__gen--icone" src={genIconeData.gen6} alt="Feunnec" />
        </li>
        <li className="Select__gen" data-gen="7" onClick={handleClick}>
          <span>• Génération 7</span>
          <img className="Select__gen--icone" src={genIconeData.gen7} alt="Brindibou" style={{ right: '10px' }} />
        </li>
        <li className="Select__gen" data-gen="8" onClick={handleClick}>
          <span>• Génération 8</span>
          <img className="Select__gen--icone" src={genIconeData.gen8} alt="Larméléon" style={{ width: '45px', right: '19px' }} />
        </li>
        <li className="Select__gen" data-gen="9" onClick={handleClick}>
          <span>• Génération 9</span>
          <img className="Select__gen--icone" src={genIconeData.gen9} alt="Poussacha" style={{ width: '35px', right: '22px', top: '-12px' }} />
        </li>
        <li className="Select__gen" data-gen="0" onClick={handleClick}>
          <span>• Toute les générations</span>
        </li>
      </ul>
    </>

  );
}

export default Select;
