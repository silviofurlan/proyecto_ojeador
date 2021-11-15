import Divisoria from "../Divisoria";
import { SearchForm } from "../SearchForm";

export default function SearchPage() {
    return (
        <div>
            <Divisoria />
            <div className='contenedorBanner'>
                <div className='datosBanner'>
                    <h1>Búsqueda de Talentos</h1>
                </div>
            </div>

            <div className='wrapper'>
                <SearchForm />
            </div>
        </div>
    );
}
