const Goal = require('../modals/goalModal')

const getGoal = async (req,res) => {
    const goals = await Goal.find();

    res.status(200).json(goals);
}

const setGoal = async(req,res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field')
    }

    const goals = await Goal.create({
        text :  req.body.text
    })

    res.status(200).json(goals);
}


const updateGoal = async(req,res) => {
   const goal = await Goal.findById(req.params.id)

   if(!goal){
    res.status(400);
    throw new Error('Goal not found')
   }

   console.log(goal.text)

    Goal.findOneAndUpdate({text : goal.text},{text : req.body.text},{new:true},(err,data) => {
        if(err) throw Error;

        res.status(200).json(data);

    }) 

   
}


const deleteGoal = async(req,res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400);
        throw new Error('Goal not found')
    }

    Goal.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json("Goal Deleted")) 

}

module.exports = {
    getGoal ,
    setGoal ,
    updateGoal ,
    deleteGoal 
}


