class Game
{
    constructor()
    {
         this.matrix = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    }

    print()
    {
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
               process.stdout.write(this.matrix[i][j] +" ");
            }
            console.log();
        }
    }

    //getting random position between 0 to 3
    getRandom()
    {
        var random = Math.random() *  ( 4 - 0) + 0;
        random = Math.floor(random);
        return random;
    }

    //adding new two at blank space
    addNewTwo()
    {
        var row = this.getRandom();
        var col = this.getRandom();
        while(this.matrix[row][col] != 0)
        {
            row = this.getRandom();
            col = this.getRandom();
        }
        this.matrix[row][col] = 2;
    }

    //getting current state of game whether we have won lost or game is still going on
    get_current_state()
    {
        //anywhere 2048 is prensent
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                if(this.matrix[i][j] == 2048)
                {
                    return "WON";
                }
            }
        }

        //anywhere 0 is present
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                if(this.matrix[i][j] == 0)
                {
                    return "GAME NOT OVER";
                }
            }
        }

        //every row and column except last row and last column
        for(var i=0;i<3;i++)
        {
            for(var j=0;j<3;j++)
            {
                if((this.matrix[i][j] == this.matrix[i+1][j]) || (this.matrix[i][j] == this.matrix[i][j+1]))
                {
                    return "GAME NOT OVER";
                }
            }
        }

        //for last row
        for(var j=0;j<3;j++)
        {
            if(this.matrix[3][j] == this.matrix[3][j+1])
            {
                return "GAME NOT OVER";
            }
        }

        //for last column
        for(var i=0;i<3;i++)
        {
            if(this.matrix[i][3] == this.matrix[i+1][3])
            {
                return "GAME NOT OVER";
            }
        }
        return "LOST";
    }

    //compressing matrix
    compress()
    {
        var changed = false;
        for(var i=0;i<4;i++)
        {
            var zeroPosition = 0;
            for(var j=0;j<4;j++)
            {
                if(this.matrix[i][j] != 0)
                {
                    var temp = this.matrix[i][zeroPosition];
                    this.matrix[i][zeroPosition] = this.matrix[i][j];
                    this.matrix[i][j] = temp;
                    if(zeroPosition != j)
                    {
                        changed = true;
                    }
                    zeroPosition++;
                }
            }
        }
        return changed;
    }

    //merge function
    merge()
    {
        var changed = false;
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<3;j++)
            {
                if((this.matrix[i][j] == this.matrix[i][j+1]) && (this.matrix[i][j] != 0))
                {
                    this.matrix[i][j] = this.matrix[i][j] * 2;
                    this.matrix[i][j+1] = 0
                    changed = true;
                }
            }
        }
        return changed;
    }

    //reversing a 1D array
    reverseArray(arr,start,end)
    {
        while(start < end)
        {
            var temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }

    //reversing matrix
    reverseMatrix()
    {
        for(var i=0;i<4;i++)
        {
            this.reverseArray(this.matrix[i],0,3);
        }
    }

    //transpose
    transpose()
    {
        var newMatrix = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                newMatrix[i][j] = this.matrix[j][i];
            }
        }
        this.matrix = newMatrix;
    }

    //left movement
    left_move()
    {
        var changed1 = this.compress();
        var changed2 = this.merge();
        var changed = changed1 || changed2;
        changed1 = this.compress();
        return changed;
    }

    //right movement
    right_move()
    {
        this.reverseMatrix();
        var changed1 = this.compress();
        var changed2 = this.merge();
        var changed = changed1 || changed2;
        changed1 = this.compress();
        this.reverseMatrix();
        return changed;
    }

    //up movement
    up_move()
    {
        this.transpose();
        var changed1 = this.compress();
        var changed2 = this.merge();
        var changed = changed1 || changed2;
        changed1 = this.compress();
        this.transpose();
        return changed;
    }

    //down_move
    down_move()
    {
        this.transpose();
        this.reverseMatrix();
        var changed1 = this.compress();
        var changed2 = this.merge();
        var changed = changed1 || changed2;
        changed1 = this.compress();
        this.reverseMatrix();
        this.transpose();
        return changed;
    }
}


g = new Game();
g.addNewTwo();
var cell_1 = document.getElementById('cell-1');
var cell_2 = document.getElementById('cell-2');
var cell_3 = document.getElementById('cell-3');
var cell_4 = document.getElementById('cell-4');
var cell_5 = document.getElementById('cell-5');
var cell_6 = document.getElementById('cell-6');
var cell_7 = document.getElementById('cell-7');
var cell_8 = document.getElementById('cell-8');
var cell_9 = document.getElementById('cell-9');
var cell_10 = document.getElementById('cell-10');
var cell_11 = document.getElementById('cell-11');
var cell_12 = document.getElementById('cell-12');
var cell_13 = document.getElementById('cell-13');
var cell_14 = document.getElementById('cell-14');
var cell_15 = document.getElementById('cell-15');
var cell_16 = document.getElementById('cell-16');

function displayOnGrid()
{
    cell_1.innerText = g.matrix[0][0];
    cell_2.innerText = g.matrix[0][1];
    cell_3.innerText = g.matrix[0][2];
    cell_4.innerText = g.matrix[0][3];
    cell_5.innerText = g.matrix[1][0];
    cell_6.innerText = g.matrix[1][1];
    cell_7.innerText = g.matrix[1][2];
    cell_8.innerText = g.matrix[1][3];
    cell_9.innerText = g.matrix[2][0];
    cell_10.innerText = g.matrix[2][1];
    cell_11.innerText = g.matrix[2][2];
    cell_12.innerText = g.matrix[2][3];
    cell_13.innerText = g.matrix[3][0];
    cell_14.innerText = g.matrix[3][1];
    cell_15.innerText = g.matrix[3][2];
    cell_16.innerText = g.matrix[3][3];
}

displayOnGrid();
var leftButton = document.getElementById('left');
var rightButton = document.getElementById('right');
var upButton = document.getElementById('up');
var downButton = document.getElementById('down');

leftButton.addEventListener('click',function()
{
    var changed = g.left_move();
    if(changed)
    {
        g.addNewTwo();
        displayOnGrid();
    }
});

rightButton.addEventListener('click',function()
{
    var changed = g.right_move();
    if(changed)
    {
        g.addNewTwo();
        displayOnGrid();
    }
});

upButton.addEventListener('click',function()
{
    var changed = g.up_move();
    if(changed)
    {
        g.addNewTwo();
        displayOnGrid();
    }
});

downButton.addEventListener('click',function()
{
    var changed = g.down_move();
    if(changed)
    {
        g.addNewTwo();
        displayOnGrid();
    }
});