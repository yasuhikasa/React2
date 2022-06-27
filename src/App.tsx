import {ChangeEvent,useState,FC} from 'react';
import './App.css';


function App() {

  const [todoText,setTodoText] = useState("");
  const [incompleteTodos,setIncompleteTodos] = useState<String[]>([]);
  const [completeTodos,setCompleteTodos] = useState<String[]>([]);

  const onChangeTodoText = (event:ChangeEvent<HTMLInputElement>) => setTodoText(event.target.value);

  const onClickAdd = () =>{
    if(todoText === "") return;

    const newTodos = [...incompleteTodos,todoText];
      setIncompleteTodos(newTodos);
      setTodoText("");
  };

    const onClickDelete = (index:number) => {
      const newTodos = [...incompleteTodos];
      newTodos.splice(index, 1);
      setIncompleteTodos(newTodos);

    };


    const onClickComplete = (index:number) => {
      const newIncompleteTodos = [...incompleteTodos];
      newIncompleteTodos.splice(index, 1);

      const newCompleteTodos = [...completeTodos,incompleteTodos[index]];
      setIncompleteTodos(newIncompleteTodos);
      setCompleteTodos(newCompleteTodos);
    };

    const onClickBack = (index:number) => {
      const newCompleteTodos = [...completeTodos];
      newCompleteTodos.splice(index, 1);

      const newIncompleteTodos = [...incompleteTodos,completeTodos[index]];
      setCompleteTodos(newCompleteTodos);
      setIncompleteTodos(newIncompleteTodos);
    };

  return (
    <>
    <div className="input-area">
      <input placeholder="TODOを入力" value={todoText} onChange={onChangeTodoText} disabled={incompleteTodos.length >= 5}/>
      <button onClick={onClickAdd} disabled={incompleteTodos.length >= 5}>追加</button>
    </div>

    {incompleteTodos.length >= 5 && (<p style={{color: "red"}}>登録できるのは５つまで</p>)}

     <div className="incomplete-area">
       <p className="title">未完了のTODO</p>
       <ul>
        
       {incompleteTodos.map((todo,index) => {
        return(
          <div className="list-row">
          <li>{todo}</li>
          <button onClick={() => onClickComplete(index)}>完了</button>
          <button onClick={() => onClickDelete(index)}>削除</button>
        </div>

        );
       })}
        
      </ul>
    </div>

    <div className="complete-area">
    <p className="title">完了のTODO</p>
       <ul>
        {completeTodos.map((todo,index) => {
          return (
            <div className="list-row">
              <li>{todo}</li>
              <button onClick={() => onClickBack(index)}>戻す</button>
            </div>
          );
        })}
      </ul>
    </div>
    </>
  );
}

export default App;
