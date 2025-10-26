import catIcon from "../../assets/cat.png"
import dogIcon from "../../assets/dog.png"
import snackIcon from "../../assets/snack.png"
import shampooIcon from "../../assets/shampoo.png"
import toothbrushIcon from "../../assets/brushing.png"
import formulaIcon from "../../assets/chemistry.png"

interface IconProps {
    name: string;
}


export const Icon = ({ name }: IconProps) => {
    return (
        <div className="w-14 h-14"> 
           <div className="bg-blue-100 rounded-full p-2 flex items-center justify-center">
            {name === 'Cat' && <img src={catIcon} alt="Cat Icon" />}
            {(name === 'Dog' || name === 'dog') && <img src={dogIcon}  alt="Dog Icon" />}
            {name === 'Chews' && <img src={snackIcon} alt="Snack Icon" />}
            {name === 'Shampoo' && <img src={shampooIcon} alt="Shampoo Icon" />}
            {name === 'Dental' && <img src={toothbrushIcon} alt="Toothbrush Icon" />}
            {name === 'Formula' && <img src={formulaIcon} alt="Formula Icon" />}
           </div>

        </div>
    )
}