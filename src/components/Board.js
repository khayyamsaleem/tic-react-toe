import React, { Component } from 'react'

export default class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [['','',''],['','',''],['','','']],
            turn: 'X',
            announcement: ''
        }
        this.checkWin.bind(this)
    }

    checkWin(){
        const board = this.state.board.map(row => row.slice())
        for (let row = 0; row < board.length; row++){
            if(board[row].every((val, i, arr) => val === arr[0] && val !== '')) return true
        }
        let transposed = board[0].map((col, i) => board.map(row => row[i]))
        for (let row = 0; row < transposed.length; row++){
            if(transposed[row].every((val, i, arr) => val === arr[0] && val !== '')) return true
        }
        let diag = []
        for (let row = 0; row < board.length; row++){
            for (let col = 0; col < board[row].length; col++){
                if (row === col){
                    diag.push(board[row][col])
                }
            }
        }
        if (diag.every((val, i, arr) => val === arr[0] && val !== '')) return true
        let reversed = board.map(row=>row.reverse())
        diag = []
        for (let row = 0; row < reversed.length; row++){
            for (let col = 0; col < reversed[row].length; col++){
                if (row === col){
                    diag.push(reversed[row][col])
                }
            }
        }
        if (diag.every((val, i, arr) => val === arr[0] && val !== '')) return true
        if (board.map(row => row.map(cell => cell === '')).every(val => val.every(cap => !cap))) return "TIE"
    }
    addMove(event){
        const [row, col] = event.target.dataset.cell.split('-')
        this.setState((state) => {
            if(!state.board[row][col]){
                state.board[row][col] = state.turn
                if(this.checkWin() === "TIE"){
                    state.announcement = `Tie!`
                    return state
                } else if (this.checkWin()){
                    state.announcement = `Player "${state.turn}" has won!`
                    return state
                }
                state.turn = (state.turn === "X") ? "O" : "X"
            }
            return state
        })
    }
    render() {
        const board= this.state.board
        let displayGrid = true;
        const grid = board.map((row,rowInd) => {
            const cells = row.map((cell, cellInd)=> {
                return <button className="cell" key={`cell-${rowInd}-${cellInd}`} data-cell={`${rowInd}-${cellInd}`} onClick={ this.addMove.bind(this)}>{(!cell) ? "_" : cell}</button>
            })
            return <div className="row" key={rowInd}>{ cells }</div>
        })
        if (this.state.announcement) displayGrid = false;
        return (
            <>
            { displayGrid ? <div className="current-player">Current Player: "{this.state.turn}"</div> : '' } 
            <div className="grid">
                { displayGrid ? grid : ''}
            </div>
            <div className="announcement">{this.state.announcement}</div>
            </>
        )
    }
}