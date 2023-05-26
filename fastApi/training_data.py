training_data = [{
    "prompt":"How many associates work under Mario ->",
    "completion":"select count(*) from user_data where line_manager_name ilike '%Mario%' .\n"
    },
    {
    "prompt":"How many LM are present in supply function? ->",
    "completion":"Select Count(Distinct associate_id) as num_line_managers From user_data Where job_family_group ilike '%Supply%' .\n"
    },
    {
    "prompt":"How many employees have less than 4 years of service and fall in 10-80 years old age group ->",
    "completion":"SELECT COUNT(*) FROM user_data WHERE DATE_PART('year', age(CURRENT_DATE, TO_DATE(effective_date, 'YYYY-MM-DD')))<4 AND DATE_PART('year', age(CURRENT_DATE, TO_DATE(date_of_birth, 'YYYY-MM-DD'))) BETWEEN 10 AND 80 .\n"
    },
    {
    "prompt":"How many employees are working for P&O job_family_group ->",
    "completion":"SELECT COUNT(*) FROM user_data WHERE job_family_group ilike '%P&O%' .\n"
    },
    {
    "prompt":"Total Associates in Mars? ->",
    "completion":"SELECT COUNT(*) FROM user_data where employment_status ilike '%Active%' .\n"
    },
    {
    "prompt":"What is the joining date and job level of Ujjwal ->",
    "completion":"select effective_date as joining_date ,job_level from user_data where associate_name ilike '%franz%' .\n"
    },
    {
    "prompt":"Joining date and segment of Rachel ->",
    "completion":"select effective_date as joining_date ,segment from user_data where associate_name ilike '%wim%' .\n"
    },
    {
    "prompt":"How many active workers do we have who are more than 30 years old ->",
    "completion":"SELECT COUNT(*) FROM user_data WHERE employment_status ilike '%Active%' AND DATE_PART('year', age(CURRENT_DATE, TO_DATE(date_of_birth, 'YYYY-MM-DD'))) > 60 .\n"
    },
    {
    "prompt":"How many people work under Mario Belino in Supply and have 2-3 years of experience ->",
    "completion":"SELECT * FROM user_data WHERE line_manager_name ilike '%Mario%' AND job_family_group ilike '%Supply%' AND DATE_PART('year', age(CURRENT_DATE, TO_DATE(effective_date, 'YYYY-MM-DD')))=2 OR DATE_PART('year', age(CURRENT_DATE, TO_DATE(effective_date, 'YYYY-MM-DD')))=3 .\n"
    },
    {
    "prompt":"number of associates working under Mario in supply and have job title of Leerdosenoperator ->",
    "completion":"SELECT COUNT(*) FROM user_data WHERE line_manager_name ILIKE '%Mario%' AND (job_family ILIKE  '%supply%' OR job_family_group ILIKE  '%supply%') AND business_title ILIKE '%Leerdosenoperator%' .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    {
    "prompt":" ->",
    "completion":" .\n"
    },
    
    
]