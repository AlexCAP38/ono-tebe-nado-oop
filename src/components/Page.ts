import {Component} from "./base/Component";
import {IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";

interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;


//принимает HTML элемент body и экземпляр Events

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        //Типа это контейнеры куда складывать сформированные карточки и прочую щляпу
        this._counter = ensureElement<HTMLElement>('.header__basket-counter');      //HTML счетчик корзины
        
        //контейнер куда добавлять готовые карточки 
        this._catalog = ensureElement<HTMLElement>('.catalog__items');      //HTML контейнер куда добавлять готовые карточки
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');       //HTML основная страница
        this._basket = ensureElement<HTMLElement>('.header__basket');       //HTML кнопка корзина

        this._basket.addEventListener('click', () => {      //Устанавливаем слушатель на клик кнопки корзины
            this.events.emit('bids:open');
        });
    }

    set counter(value: number) {        //Установить значения счетчика в орзине
        this.setText(this._counter, String(value));
    }

    //Добавить карточки на старницу
    set catalog(items: HTMLElement[]) {     //принимает массив html элементов     

        this._catalog.replaceChildren(...items);
    }

    set locked(value: boolean) {        // ЗАБЛОКИРОВАТЬ СКРОЛ нахер выкинуть 
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }
}