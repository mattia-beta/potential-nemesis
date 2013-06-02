//
//  ReportController.h
//  nemesis
//
//  Created by mattia benedetti on 02/06/13.
//  Copyright (c) 2013 mattia benedetti. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ReportController : UIViewController
{
    UITextView *name;
    UITextView *description;
}

@property (retain, nonatomic) NSString *latitudine;
@property (retain, nonatomic) NSString *longitudine;

@property (retain, nonatomic) IBOutlet UITextView *description;
@property (retain, nonatomic) IBOutlet UITextView *name;

-(IBAction)do_send:(id)sender;
- (void) connection:(NSURLConnection *)connection didReceiveData:(NSData *)data;

@end
