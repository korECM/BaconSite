import React from 'react'
import RouletteItem from './RouletteItem';

interface Props {

}

interface RouletteItemState {
    id: number;
    text: string;
    done: boolean;
}

interface State {
    input: string;
    RouletteItems: RouletteItemState[];
}

class RouletteList extends React.Component<Props, State> {
    nextRouletteId: number = 0;
    
    state:State = {
        input: '',
        RouletteItems: []
    };

    onToggle = (id: number): void => {
        const { RouletteItems } = this.state;
        const nextRouletteItems:RouletteItemState[] = RouletteItems.map( item => {
            if(item.id === id) {
                item.done = !item.done
            }
            return item;
        });

        this.setState({
            RouletteItems: nextRouletteItems
        });
    }

    onSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        const { RouletteItems, input } = this.state;
        const newItem:RouletteItemState = { id: this.nextRouletteId++, text: input, done: false};
        const nextRouletteItems:RouletteItemState[] = RouletteItems.concat(newItem);
        this.setState({
            input: '',
            RouletteItems: nextRouletteItems
        });
    }
    
    onRemove = (id: number): void => {
        const { RouletteItems } = this.state;
        const nextRouletteItems: RouletteItemState[] = RouletteItems.filter( item => item.id !== id);
        this.setState({
            RouletteItems: nextRouletteItems
        });
    }

    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { value } = e.currentTarget;
        this.setState({
            input: value
        });
    }

    render() {
        const { onSubmit, onChange, onToggle, onRemove } = this;
        const { input, RouletteItems } = this.state;
    
        const RouletteItemList: React.ReactElement[] = RouletteItems.map(
            Roulette => (
            <RouletteItem
              key={Roulette.id}
              done={Roulette.done}
              onToggle={() => onToggle(Roulette.id)}
              onRemove={() => onRemove(Roulette.id)}
              text={Roulette.text}
            />
          )
        );
    
        return (
          <div>
            <h1>오늘 뭐하지?</h1>
            <form onSubmit={onSubmit}>
              <input onChange={onChange} value={input} />
              <button type="submit">추가하기</button>
            </form>
            <ul>
              {RouletteItemList}
            </ul>
          </div>
        );
    }

}

export default RouletteList;