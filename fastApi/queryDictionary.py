


querySet = {
        # "GetEmployeeManager":["SELECT manager FROM employee_details where employee_name = '{}'", 
        #                         "Hi, thanks for asking :) {}'s manager is {}."
        # ],

        "CountAssociate": ["select count ( associate_id) from user_data where line_manager_name like '%{}%'",
                                "Hi, Thanks for asking :)  {} associates reports to {}."
        ],

        "GetLocation": ["select site_code from user_data where line_manager_name like '%{}%' limit 1",
                                "Hi,Thanks for asking:) {} is {}'s location."
        ],

        "CountSite": ["select count ( associate_name) from user_data where site_code like '%{}%'",
                                "Hi, Thanks for asking:) {} associate work at {} "

        ],

        "GetEffectiveDate": ["select effective_date from user_data where associate_name  like '%{}%'",
                                "Hi, Thanks for asking:) {} is {}'s effective date "
        ],


 
        
}
