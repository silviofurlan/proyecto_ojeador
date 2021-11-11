import { PlayerCard } from "../PlayerCard";
import { useSearchProfiles } from "../../hooks/useSearchProfiles";
import { SearchForm } from "../SearchForm";

export default function SearchPage() {
    return (
        <div className='App'>
            <header className='App-header'>
                <div className='main'>
                    <section id='introContenedor'>
                        <h1>
                            <span>Búsqueda de Talentos</span>
                        </h1>
                    </section>

                    <div className='wrapper'>
                        <SearchForm />
                    </div>
                </div>
            </header>
        </div>
    );
}
