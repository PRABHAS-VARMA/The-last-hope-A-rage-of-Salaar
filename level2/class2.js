class Sprite{
    constructor({position,imageSrc,scale = 1, framesMax =1,framesCurrent=0,framesElapsed=0,framesHold=10}){
        this.position = position
        this.width = 1520
        this.height = 729
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = framesCurrent 
        this.framesElapsed = framesElapsed
        this.framesHold = framesHold
        
    }
    draw(){
        c.drawImage(
            this.image,
            this.framesCurrent *(this.width / this.framesMax) ,
            0,
            this.width / this.framesMax,
            this.height,
            this.position.x, this.position.y, 
            (this.width/this.framesMax) * this.scale, 
            this.height * this.scale)
    }

    update(){
        this.draw()
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold===0){
            if (this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            }else{
                this.framesCurrent = 0
            }
      }
    }
}



// extends Sprite
class Fighter extends Sprite{
    constructor({position,velocity,color="red", offset,imageSrc,scale = 1, framesMax =1,framesCurrent,
    framesElapsed,
    framesHold}){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            framesCurrent,
            framesElapsed,
            framesHold

        });


        // this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x:this.position.x,
                y:this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }

    draw(){
        c.fillStyle=this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // attack box
        if (this.isAttacking){

            c.fillStyle="green"
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            )

        }
        
    }

    update(){
        this.draw()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y+this.height+ this.velocity.y>=canvas.height-35){
            this.velocity.y=0
        }else{
            this.velocity.y += gravity

        }}

        attack(){
            this.isAttacking = true
            setTimeout(() => {
                this.attacking = false
            },100)
        }
    

}