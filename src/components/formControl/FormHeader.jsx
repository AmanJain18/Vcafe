import { Link } from 'react-router-dom';
import LogoHead from '../../assets/logohr.png';

const FormHeader = ({ heading,
    paragraph,
    linkName,
    linkUrl = "#" }) => {
    return (
        <div className="mb-10">
            <div className="md:flex justify-center items-center gap-2 hidden ">
                <img
                    alt="logo"
                    className="h-14 object-contain"
                    src={LogoHead} />
                <strong className='text-xl'>V - Cafe</strong>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="text-center text-sm text-gray-600 mt-5">
                {paragraph} {' '}
                <Link to={linkUrl} className="font-medium text-orange-600 hover:text-orange-500">
                    {linkName}
                </Link>
            </p>
        </div>
    )
}

export default FormHeader;