const Goal = require('../modals/goalModal')
const User = require('../modals/userModal')
const getGoal = async (req,res) => {
    const goals = await Goal.find({user : req.user.id});

    res.status(200).json(goals);
}

const setGoal = async(req,res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field')
    }

    const goals = await Goal.create({
        text :  req.body.text,
        user : req.user.id
    })

    res.status(200).json(goals);
}


const updateGoal = async(req,res) => {
   const goal = await Goal.findById(req.params.id)

   if(!goal){
    res.status(400);
    throw new Error('Goal not found')
   }
  
   const user = await User.findById(req.user.id)

   if(!user){
    return res.status(401).json({msg : "User Not Found"})
   }
   
   if(goal.user.toString() !== user.id ){
    return res.status(401).json({msg : "User Not Authorized"})
   }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true});
    
    return res.status(200).json(updatedGoal);

   
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


